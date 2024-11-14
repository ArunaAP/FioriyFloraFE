import easyinvoice from 'easyinvoice';

export const generateInvoice = async (order) => {
  try {
    const customerId = order.customerId._id || order.customerId;

    // Fetch customer details
    const customerResponse = await fetch(`http://localhost:5000/api/customers/${customerId}`);
    if (!customerResponse.ok) {
      throw new Error('Failed to fetch customer details');
    }
    const customer = await customerResponse.json();

    // Calculate the subtotal from order items
    let subtotal = 0;
    const products = await Promise.all(order.orderItems.map(async (item) => {
      const flowerName = await getFlowerName(item.flowerId);
      subtotal += item.price * item.quantity; // Accumulate the total price
      return {
        quantity: item.quantity,
        description: flowerName,
        "tax-rate": 0,
        price: item.price,
      };
    }));

    // Define the invoice data structure
    const data = {
      images: {
        logo: "https://res.cloudinary.com/dmr1wvwz3/image/upload/v1731340783/k7oraaiibtudtvxzdmsv.png",
      },
      sender: {
        company: "Fioriy Flora",
        address: "Araliya, Udawela, Mirahawatte.",
        zip: "90200",
        city: "Welimada",
        country: "Sri Lanka",
      },
      client: {
        company: customer.name,
        address: customer.address,
        city: customer.location || "",
      },
      information: {
        number: order._id,
        date: new Date().toLocaleDateString(),
        "due-date": new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString(),
      },
      products: products,
      "bottom-notice": "Thank you for your purchase!",
      settings: {
        currency: "LKR",
      },
      // Add custom fields for subtotal, courier charge, and total
      "custom-fields": [
        {
          name: "Subtotal",
          value: `LKR ${subtotal.toFixed(2)}`,
        },
        {
          name: "Courier Charge",
          value: `LKR ${order.courierCharge.toFixed(2)}`,
        },
        {
          name: "Total",
          value: `LKR ${(subtotal + order.courierCharge).toFixed(2)}`,
        },
      ],
    };

    // Generate and download the invoice
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`invoice_${order._id}.pdf`, result.pdf);
  } catch (error) {
    console.error("Error generating invoice:", error);
  }
};

// Helper function to get flower name by ID
const getFlowerName = async (flowerId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/flowers/${flowerId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch flower name');
    }
    const flower = await response.json();
    return flower.name;
  } catch (error) {
    console.error("Error fetching flower name:", error);
    return "Unknown Flower";
  }
};

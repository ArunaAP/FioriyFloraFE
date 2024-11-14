import { jsPDF } from "jspdf";
import axios from "axios";

export const generateAddressLabel = async (order) => {
  try {
    // Fetch customer details if order has a customerId
    const customerId = order.customerId._id || order.customerId; // Ensure customerId is correctly assigned
    const response = await axios.get(`http://localhost:5000/api/customers/${customerId}`);
    const customer = response.data;

    // Create jsPDF instance with landscape orientation
    const doc = new jsPDF("landscape", "mm", "a4");

    // Set the font and size for the title and sender/recipient labels
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);  // Increased font size

    // Add the logo (provide the logo path or base64 image)
    const logoUrl = "https://res.cloudinary.com/dmr1wvwz3/image/upload/v1731340783/k7oraaiibtudtvxzdmsv.png"; // Replace with your logo URL
    doc.addImage(logoUrl, "PNG", 10, 10, 40, 20); // Adjust the size (40x40) and position (10,10)

    // Set sender and recipient font sizes
    const textFontSize = 20;

    // Add the sender information on the left side
    doc.setFontSize(textFontSize);
    doc.text("From:", 10, 60); // Adjusted Y-position to avoid overlap with logo
    doc.setFont("Helvetica", "normal");
    doc.text("Fioriy Flora", 10, 70);
    doc.text("Araliya, Udawela, Mirahawatte", 10, 80);
    doc.text("90200, Welimada, Sri Lanka", 10, 90);

    // Add the recipient information on the right side
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(textFontSize);
    doc.text("To:", 190, 60); // Adjusted Y-position to match sender info
    doc.setFont("Helvetica", "normal");
    doc.text(customer.name, 190, 70);
    doc.text(customer.address, 190, 80);
    if (customer.location) {
        doc.text(customer.location, 190, 90);
    }
    if (customer.zipCode) { 
      doc.text(customer.zipCode, 190, 100);
    }

    // Calculate the width and height of the combined content for both sender and recipient
    const rectX = 5; // X-position of the rectangle (starting from left)
    const rectY = 40; // Y-position (starting from top, below the logo)
    const rectWidth = 290; // Total width of the page minus some margins
    const rectHeight = 80   ; // Height that covers both sender and recipient content

    // Draw a rectangle around both sender's and recipient's details
    doc.setLineWidth(0.5);
    doc.rect(rectX, rectY, rectWidth, rectHeight); // Single rectangle around both address blocks

    // Save the PDF
    doc.save(`address_label_${order._id}.pdf`);
  } catch (error) {
    console.error("Error generating address label:", error);
  }
};

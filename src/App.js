import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Dashboard from './components/Dashboard'
import Products from './components/Products'
import Customers from './components/Cutomers'
import CustomerForm from './components/CustomerForm'
import FlowerForm from './components/FlowerForm'
import Orders from './components/Orders'
import AddOrder  from './components/AddOrders'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard/>}/>
                  <Route path='flowers' element={<Products/>}/>
                  <Route path='customers' element={<Customers/>}/>
                  <Route path='/add-customer' element={<CustomerForm/>}/>
                  <Route path='/edit-customer/:customerId' element={<CustomerForm/>}/>
                  <Route path="/add-flower" element={<FlowerForm />} />
                <Route path="/edit-flower/:flowerId" element={<FlowerForm />} />
                <Route path="/orders" element={<Orders />} />
        <Route path="/add-order" element={<AddOrder />} />
                </Route>
                <Route path='login' element={<div>this is login</div>}/>
            </Routes>
        </Router>
    )
}

export default App

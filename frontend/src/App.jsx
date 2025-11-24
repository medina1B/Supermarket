import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/NavBar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CustomerSignup from "./pages/CustomerSignup";
import CustomerLogin from "./pages/CustomerLogin";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import JoinUs from "./pages/JoinUs";
import SupermarketList from "./pages/SupermarketList";
import Checkout from "./components/Checkout"
import Payment from "./pages/Payment"; 
import Orders from "./pages/Orders";
// ✅ Pages


const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:storeId" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/CustomerSignup" element={<CustomerSignup />} />
           <Route path="/customer/login" element={<CustomerLogin />} />
            <Route path="/cart" element={<Cart />} />
<Route path="/Join-Us" element={<JoinUs/>} />

       <Route path="/supermarkets" element={<SupermarketList />} />   
       <Route path="/checkout" element={<Checkout />} />
  <Route path="/payment" element={<Payment />} />
  <Route path="/orders" element={<Orders />} />

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;

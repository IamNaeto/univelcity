import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetail";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/create" element={<CreateProduct />} />
        <Route path="/product/update/:id" element={<UpdateProduct />} />
      </Routes>
    </div>
  );
}

export default App;

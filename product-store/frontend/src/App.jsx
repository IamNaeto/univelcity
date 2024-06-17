import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetail";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/details/:id" element={<ProductDetails />} />
        <Route path="/product/create" element={<CreateProduct />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default App;

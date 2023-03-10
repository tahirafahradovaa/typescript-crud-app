import { useState } from "react";
import "./App.css";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import { Route, Routes, Link } from "react-router-dom";
import Layout from "./Layout/Layout";
import Info from "./pages/Info";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Info />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="suppliers" element={<Suppliers />} />
      </Route>
    </Routes>
  );
}

export default App;

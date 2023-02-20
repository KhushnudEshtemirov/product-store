import { useState, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/homePage/HomePage";
import Header from "./components/header/Header";
import Services from "./pages/services/Services";
import Products from "./pages/products/Products";
import About from "./pages/about/About";
import SingleProduct from "./pages/singleProduct/SingleProduct";

import "./App.scss";

export const HiddenContext = createContext();

function App() {
  const [isHidden, setHidden] = useState(false);

  return (
    <HiddenContext.Provider value={{ isHidden, setHidden }}>
      <div className={`App ${isHidden ? "hidden" : ""}`}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products/*" element={<Products />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </HiddenContext.Provider>
  );
}

export default App;

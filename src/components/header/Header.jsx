import React from "react";
import { Link } from "react-router-dom";

import "../../styles/styles.scss";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/services">Services</Link>
      <Link to="/products">All Products</Link>
      <Link to="/about">About</Link>
    </div>
  );
};

export default Header;

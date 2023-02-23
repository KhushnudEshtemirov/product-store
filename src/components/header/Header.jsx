import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IoReorderThreeOutline } from "react-icons/io5";
import "../../styles/styles.scss";

const Header = () => {
  const [isBlack, setBlack] = useState(false);
  const [innerWidth, setInnerWidth] = useState();

  window.addEventListener("resize", () => {
    setInnerWidth(window.innerWidth);
  });

  const handleClick = () => {
    if (innerWidth < 600) {
      setBlack(!isBlack);
    }
  };

  return (
    <>
      <div
        className={`black_window ${isBlack ? "show_black" : ""}`}
        onClick={() => handleClick()}
      ></div>
      <div className="header">
        <div className={`navbar ${isBlack ? "show" : ""}`}>
          <Link to="/" onClick={() => handleClick()}>
            Home
          </Link>
          <Link to="/services" onClick={() => handleClick()}>
            Services
          </Link>
          <Link to="/products" onClick={() => handleClick()}>
            All Products
          </Link>
          <Link to="/about" onClick={() => handleClick()}>
            About
          </Link>
        </div>
        <IoReorderThreeOutline onClick={() => handleClick()} />
      </div>
    </>
  );
};

export default Header;

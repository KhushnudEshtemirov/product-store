import React, { useState, useContext } from "react";

import { useQuery } from "react-query";

import CartItem from "../../components/cartItem/CartItem";
import Loading from "../../components/loading/Loading";
import AddProduct from "../../components/addModal/AddProduct";
import { HiddenContext } from "../../App";
import { getProducts } from "../../api/api";

import { AiOutlinePlus } from "react-icons/ai";
import { Typography } from "@mui/material";

const Products = () => {
  const [isShow, setShow] = useState(false);
  const [isRotate, setRotate] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isHidden, setHidden } = useContext(HiddenContext);

  // Get products
  const { isLoading, data, refetch } = useQuery("product", getProducts);
  const handleClick = () => {
    setShow(!isShow);
    setRotate(!isRotate);
    setHidden(!isHidden);
  };

  return (
    <>
      <div
        className={`black_window ${isShow ? "show_black" : ""}`}
        onClick={() => handleClick()}
      ></div>
      {isLoading || loading ? (
        <Loading />
      ) : (
        <div className="products-page">
          <Typography variant="h5" align="center" sx={{ marginTop: 2 }}>
            All products here
          </Typography>
          <div className="product-items">
            {!!data &&
              data.data
                .slice(0)
                .reverse()
                .map((product) => <CartItem key={product.id} {...product} />)}
          </div>
          <div
            className={`add_item ${isRotate ? "add_rotate" : ""}`}
            onClick={() => handleClick()}
          >
            <AiOutlinePlus />
          </div>
          <AddProduct
            setLoading={setLoading}
            isShow={isShow}
            handleClick={handleClick}
            refetch={refetch}
          />
        </div>
      )}
    </>
  );
};

export default Products;

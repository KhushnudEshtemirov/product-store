import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import Loading from "../../components/loading/Loading";
import EditProduct from "../../components/editProduct/EditProduct";
import { deleteProduct, getOneProduct } from "../../api/api";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "../../styles/styles.scss";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [modalActive, setModalActive] = useState(false);
  const [isShow, setShow] = useState(false);

  const { isLoading, data, refetch, isFetching } = useQuery(
    ["product", productId],
    () => getOneProduct(productId),
    {
      staleTime: 0,
    }
  );

  const name = data?.data?.name;
  const description = data?.data?.description;
  const price = data?.data?.price;
  const imgUrl = data?.data?.imgUrl;
  const text = data?.data?.fullText;

  const { mutate } = useMutation(deleteProduct, {
    onSuccess: () => {
      navigate("/products");
    },
  });

  const handleClick = () => {
    setShow(!isShow);
    setModalActive(!modalActive);
  };

  return (
    <>
      <div
        className={`black_window ${isShow ? "show_black" : ""}`}
        onClick={() => handleClick()}
      ></div>
      {isLoading ? (
        <Loading />
      ) : (
        <Card sx={{ maxWidth: 500, marginTop: 2, marginLeft: 2 }}>
          <CardMedia component="img" alt={name} height="220" image={imgUrl} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}{" "}
              <span style={{ float: "right", fontSize: 18, marginTop: 4 }}>
                {" "}
                ${price}
              </span>
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleClick()}>
              EDIT
            </Button>
            <Button
              size="small"
              sx={{ color: "red" }}
              onClick={() => mutate(productId)}
            >
              DELETE
            </Button>
          </CardActions>
        </Card>
      )}
      <EditProduct
        dataObj={data?.data}
        isFetching={isFetching}
        showModal={modalActive}
        handleClick={handleClick}
        refetch={refetch}
      />
    </>
  );
};

export default SingleProduct;

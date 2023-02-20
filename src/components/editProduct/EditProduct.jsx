import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

import Loading from "../loading/Loading";

import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import "../../styles/styles.scss";

const EditProduct = ({
  dataObj,
  showModal,
  handleClick,
  isFetching,
  refetch,
}) => {
  const { productId } = useParams();

  const { isLoading, mutate } = useMutation(
    async ({ id, ...productData }) =>
      await axios
        .put(`http://localhost:4000/product/${id}`, productData)
        .then((res) => res.data)
        .then(() => refetch())
  );

  const [productData, setData] = useState({
    id: "",
    name: "",
    fullText: "",
    description: "",
    price: "",
    imgUrl: "",
  });

  useEffect(() => {
    if (!isFetching) {
      setData({
        id: productId,
        name: dataObj.name,
        fullText: dataObj.fullText,
        description: dataObj.description,
        price: dataObj.price,
        imgUrl: dataObj.imgUrl,
      });
    }
  }, [isFetching]);

  if (isFetching) {
    return <Loading />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(productData);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`add_modal ${showModal ? "show_modal" : ""}`}
      style={{ top: 100 }}
    >
      <Card>
        <Typography
          gutterBottom
          variant="h4"
          align="center"
          style={{ paddingTop: "20px" }}
        >
          Edit product details
        </Typography>
        <CardContent>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid container spacing={2}>
              <Grid sm={6} xs={12} item>
                <TextField
                  fullWidth
                  label="Product Name"
                  placeholder="Enter Product Name"
                  name="name"
                  value={productData.name}
                  required
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid sm={6} xs={12} item>
                <TextField
                  fullWidth
                  label="Product Image"
                  placeholder="Enter Last Name"
                  name="image"
                  value={productData.imgUrl}
                  required
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      imgUrl: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid sm={6} xs={12} item>
                <TextField
                  fullWidth
                  type="number"
                  label="Product Price"
                  placeholder="Enter Product Price"
                  name="price"
                  value={productData.price}
                  required
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid sm={6} xs={12} item>
                <TextField
                  fullWidth
                  label="Product Description"
                  placeholder="Type product description"
                  name="description"
                  value={productData.description}
                  required
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  fullWidth
                  label="Full text"
                  multiline
                  rows={4}
                  placeholder="Type fully about the product"
                  name="text"
                  value={productData.fullText}
                  required
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      fullText: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid xs={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleClick()}
                >
                  Edit Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProduct;

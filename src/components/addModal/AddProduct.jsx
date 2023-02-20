import React, { useRef } from "react";

import { useMutation } from "react-query";

import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import "../../styles/styles.scss";
import axios from "axios";

const AddProduct = ({ isShow, handleClick, refetch }) => {
  const formRef = useRef();
  // Add product
  const { mutate } = useMutation(async (data) => {
    return await axios
      .post("http://localhost:4000/product", data)
      .then((res) => {
        refetch();
      });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const img = data.get("image");
    const price = data.get("price");
    const description = data.get("description");
    const text = data.get("text");

    const productData = {
      name: name,
      imgUrl: img,
      price: price,
      description: description,
      fullText: text,
    };

    mutate(productData);

    formRef.current.reset();
  };

  return (
    <div className={`add_modal ${isShow ? "show_modal" : ""}`}>
      <Card>
        <Typography
          gutterBottom
          variant="h4"
          align="center"
          style={{ paddingTop: "20px" }}
        >
          Add new product
        </Typography>
        <CardContent>
          <form onSubmit={(e) => handleSubmit(e)} ref={formRef}>
            <Grid container spacing={2}>
              <Grid sm={6} xs={12} item>
                <TextField
                  fullWidth
                  label="Product Name"
                  placeholder="Enter Product Name"
                  name="name"
                  required
                />
              </Grid>
              <Grid sm={6} xs={12} item>
                <TextField
                  fullWidth
                  label="Product Image"
                  placeholder="Enter Last Name"
                  name="image"
                  required
                />
              </Grid>
              <Grid sm={6} xs={12} item>
                <TextField
                  fullWidth
                  type="number"
                  label="Product Price"
                  placeholder="Enter Product Price"
                  name="price"
                  required
                />
              </Grid>
              <Grid sm={6} xs={12} item>
                <TextField
                  fullWidth
                  label="Product Description"
                  placeholder="Type product description"
                  name="description"
                  required
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
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;

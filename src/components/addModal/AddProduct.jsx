import React, { useRef, useState } from "react";

import { useMutation } from "react-query";

import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import { postProduct } from "../../api/api";

import "../../styles/styles.scss";

const AddProduct = ({ isShow, handleClick, refetch }) => {
  const [image, setImage] = useState(null);
  const formRef = useRef();
  // Add product
  const { mutate } = useMutation(postProduct, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const price = data.get("price");
    const description = data.get("description");
    const text = data.get("text");

    const productData = {
      name: name,
      image: image,
      price: price,
      description: description,
      full_text: text,
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
                  name="image"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImage}
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

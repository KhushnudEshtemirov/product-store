import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { updateProduct } from "../../api/api";
import { LoaderContext } from "../../pages/singleProduct/SingleProduct";

import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import "../../styles/styles.scss";
import Loading from "../loading/Loading";

const EditProduct = ({
  dataObj,
  showModal,
  handleClick,
  isFetching,
  refetch,
  setLoad,
}) => {
  const { productId } = useParams();

  const [productData, setData] = useState({
    id: "",
    name: "",
    full_text: "",
    description: "",
    price: "",
    image: "",
  });

  const { mutate } = useMutation(updateProduct, {
    onSuccess: () => {
      refetch();
      setLoad(false);
    },
  });

  const handleImage = (e) => {
    setData({ ...productData, image: e.target.files[0] });
  };

  useEffect(() => {
    if (!isFetching) {
      setData({
        id: productId,
        name: dataObj.name,
        full_text: dataObj.full_text,
        description: dataObj.description,
        price: dataObj.price,
      });
    }
  }, [isFetching]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(productData);
    setLoad(true);
  };

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
                  name="image"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImage}
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
                  value={productData.full_text}
                  required
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      full_text: e.target.value,
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

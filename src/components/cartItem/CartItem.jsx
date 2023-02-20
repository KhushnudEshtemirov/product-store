import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import "../../styles/styles.scss";
import { Link, useRoutes } from "react-router-dom";

const CartItem = (product) => {
  const { name, price, imgUrl, description, id } = product;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="180" image={imgUrl} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}{" "}
            <span style={{ fontSize: 18, float: "right", marginTop: 5 }}>
              {" "}
              ${price}
            </span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={`/products/${id}`}>READ MORE</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;

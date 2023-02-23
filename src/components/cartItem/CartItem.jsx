import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import "../../styles/styles.scss";
import { Link, useRoutes } from "react-router-dom";

const CartItem = (product) => {
  const { name, price, image, description, id } = product;

  return (
    <Card sx={{ maxWidth: "100%", height: 360, position: "relative" }}>
      <CardActionArea>
        <CardMedia component="img" height="180" image={image} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}{" "}
            <span style={{ fontSize: 18, float: "right", marginTop: 5 }}>
              {" "}
              ${price}
            </span>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="hidden_text"
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ position: "absolute", bottom: 0 }}>
        <Button size="small" color="primary">
          <Link to={`/products/${id}`}>READ MORE</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;

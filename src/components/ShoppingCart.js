import ProductForm from "./ProductForm";
import { handleImageUpload } from "./ImageUpload";
import React, { useState, useEffect } from "react";
import { SimpleGrid, Box, Button } from '@chakra-ui/react';
import Product from "./Product";

function ShoppingCart(props) {
  const { userCart, removeFromCart } = props;

  const user = props.userCredentialInfo;
  const userEmail = user ? user.email : null;

  // const handleRemoveItemClick = () => {
  //   console.log("Remove this item: ");
  //   // console.log(id);
  // };

  const handleRemoveId = (id) => {
    removeFromCart(id)
  };

  return (
    <React.Fragment>
      <SimpleGrid columns={3} spacing={10}>
        {props.userCart.map((product) =>
          <Box key={product.id}>
            <Button
              onClick={() => handleRemoveId(product.id)}>X</Button>
            <Product
              whenProductClicked={props.onProductSelection}
              imageUrl={product.imageUrl}
              title={product.title}
              description={product.description}
              condition={product.condition}
              price={product.price}
              user={product.user}
              id={product.id}
              key={product.id}
            />
          </Box>
        )}
      </SimpleGrid>
    </React.Fragment>
  );

}

export default ShoppingCart;
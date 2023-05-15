import ProductForm from "./ProductForm";
import { handleImageUpload } from "./ImageUpload";
import React, { useState, useEffect } from "react";
import { SimpleGrid } from '@chakra-ui/react';
import Product from "./Product";

function ShoppingCart(props) {
  const { userCart } = props;

    const user = props.userCredentialInfo
  const userEmail = user ? user.email : null;
  
  return (
    <React.Fragment>
      <SimpleGrid columns={3} spacing={10}>
      {props.userCart.map((product) =>
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
        )}
      </SimpleGrid>
    </React.Fragment>
  );

}

export default ShoppingCart;
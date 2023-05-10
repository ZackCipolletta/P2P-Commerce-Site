import React from "react";
import Product from "./Product";
import { Box } from '@chakra-ui/react';

function ProductDetail(props) {







  return (
    <React.Fragment>
      <Box border="1px solid gray" p={4}>
        <p>Title: {props.product.title}</p>
        <p>Condition: {props.product.condition}</p>
        <p>Price: ${props.product.price}</p>
        <p>Description: {props.product.description}</p>
        <p>Seller: {props.product.seller}</p>
      </Box>
    </React.Fragment>
  );
}

export default ProductDetail;
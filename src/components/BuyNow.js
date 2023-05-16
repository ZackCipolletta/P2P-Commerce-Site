import ProductForm from "./ProductForm";
import { handleImageUpload } from "./ImageUpload";
import React, { useState, useEffect } from "react";
import { SimpleGrid, Box, Button, Divider, CardFooter, ButtonGroup, Card, Text } from '@chakra-ui/react';
import Product from "./Product";

function BuyNow(props) {
  const { removeFromCart, product } = props;

  const handleRemoveId = (id) => {
    removeFromCart(id);
  };

  return (
    <React.Fragment>
      <SimpleGrid columns={2} spacing={10}>
          <Box
            h="125px" // Set the height of the image container
            w="125px" // set width of the image
            bgImage={`url(${product.imageUrl})`} // Set the image URL as the background
            bgSize="cover" // Zoom the image to cover the container
            bgPosition="center" // Center the image within the container
            mx={"30px"}
          />
          <Text>{product.title}</Text>
          <Text>Item price ${product.price}</Text>
          <Text>Shipping price ${product.shippingPrice}</Text>
          <Text>Total cost: ${product.price + product.shippingPrice}</Text>
          <Divider />
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='blue'>
                Buy now
              </Button>
            </ButtonGroup>
      </SimpleGrid>
    </React.Fragment>
  );

}

export default BuyNow;
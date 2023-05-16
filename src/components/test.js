import React, { useState, useEffect } from "react";
import { SimpleGrid, Box, Button, Divider, CardFooter, ButtonGroup, Card, Text } from '@chakra-ui/react';
import { createOrder } from './api'; // Assuming you have an API module for making requests to your server

function Checkout(props) {
  const { removeFromCart, product } = props;
  const [orderId, setOrderId] = useState(null);

  const handleRemoveId = (id) => {
    removeFromCart(id);
  };

  const handleBuyNow = async () => {
    try {
      const response = await createOrder(); // Make a request to your server to create a PayPal order
      const orderID = response.orderID; // Assuming your response contains the orderID from PayPal
      setOrderId(orderID);
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle error condition
    }
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
            <Button variant='solid' colorScheme='blue' onClick={handleBuyNow}>
              Buy now
            </Button>
          </ButtonGroup>
      </SimpleGrid>
      {orderId && (
        <Text>Order ID: {orderId}</Text>
      )}
    </React.Fragment>
  );
}

export default Checkout;

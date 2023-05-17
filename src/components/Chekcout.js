import React, { useState, useEffect } from "react";
import { SimpleGrid, Box, Button, Divider, CardFooter, ButtonGroup, Text } from '@chakra-ui/react';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function ButtonWrapper({ currency, showSpinner, product }) {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  const amount = (product.price + product.shippingPrice).toFixed(2);
  const style = { layout: "vertical" };

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <Box
        p={4}
        bg="black" // Set the background color of the box
        rounded="md" // Apply rounded corners to the box
      >
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after creating the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              // Your code here after capturing the order
            });
          }}
        />
      </Box>
    </>
  );
}

function Checkout(props) {
  const { product } = props;
  const currency = "USD";

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
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
        </ButtonGroup>
      </SimpleGrid>

      <PayPalScriptProvider
        options={{
          "client-id": "AUknOzgS5H3nPwIqTdoT2RDkYxthBoe4eY4DExJs_FDwbZpp-jMCBaaxO1hYqJyTilj8tJV7vnHdZtoH",
          components: "buttons",
          currency: "USD",
        }}
      >
         <ButtonWrapper currency={currency} showSpinner={false} product={product} /*{ parentColor={parentColor} }*/  /> 
      </PayPalScriptProvider>
    </React.Fragment>
  );
}

export default Checkout;

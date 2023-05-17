import React, { useState, useEffect } from "react";
import {
  SimpleGrid, Box, Button, Divider, CardFooter, ButtonGroup, Image, Text,
  AspectRatio, VStack, Stack, Flex, Heading, HStack, Link, useColorMode, useColorModeValue as mode,
} from '@chakra-ui/react';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import UserDetails from "./UserDetails";
import PayPal from "./PayPal";
import PurchaseSummary from "./PurchaseSummary";


const Checkout = (props) => {
  const { product } = props;
  const currency = "USD";

  return (
    <React.Fragment>
      <PurchaseSummary product={product}/>
      <PayPalScriptProvider
        options={{
          "client-id": "AUknOzgS5H3nPwIqTdoT2RDkYxthBoe4eY4DExJs_FDwbZpp-jMCBaaxO1hYqJyTilj8tJV7vnHdZtoH",
          components: "buttons",
          currency: "USD",
        }}
      >
        <PayPal currency={currency} showSpinner={false} product={product} /*{ parentColor={parentColor} }*/ />
      </PayPalScriptProvider>
    </React.Fragment>



  );
};

export default Checkout;


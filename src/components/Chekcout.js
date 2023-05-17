import React, { useState, useEffect } from "react";
import {
  SimpleGrid, Box, Button, Divider, CardFooter, ButtonGroup, Image, Text,
  AspectRatio, VStack, Stack, Flex, Heading, HStack, Link, useColorMode, useColorModeValue as mode,
} from '@chakra-ui/react';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import UserDetails from "./UserDetails";
import PayPal from "./PayPal";


const Checkout = (props) => {
  const { toggleColorMode } = useColorMode();
  const bgColor = mode('gray.50', 'whiteAlpha.50');
  const secondaryTextColor = mode('gray.600', 'gray.400');

  const { product } = props;
  const currency = "USD";

  return (
    <VStack
      w="full"
      h="full"
      p={10}
      spacing={6}
      align="flex-start"
      bg={bgColor}
    >
      <VStack alignItems="flex-start" spacing={3}>
        <Heading size="2xl">Your cart</Heading>
        <Text>
          If the price is too hard on your eyes,{' '}
          <Button onClick={toggleColorMode} variant="link" colorScheme="black">
            try changing the theme.
          </Button>
        </Text>
      </VStack>
      <HStack spacing={6} alignItems="center" w="full">
        <AspectRatio ratio={1} w={24}>
        <Image src={product.imageUrl} />
        </AspectRatio>
        <Stack
          spacing={0}
          w="full"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <VStack w="full" spacing={0} alignItems="flex-start">
            <Heading size="md">{product.title}</Heading>
            {/* <Text color={secondaryTextColor}>PNYCOMP27541</Text> */}
          </VStack>
          <Heading size="sm" textAlign="end">
            ${product.price}
          </Heading>
        </Stack>
      </HStack>
      <VStack spacing={4} alignItems="stretch" w="full">
        <HStack justifyContent="space-between">
          <Text color={secondaryTextColor}>Subtotal</Text>
          <Heading size="sm">${product.price}</Heading>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color={secondaryTextColor}>Shipping</Text>
          <Heading size="sm">${product.shippingPrice}</Heading>
        </HStack>
        <HStack justifyContent="space-between">
        </HStack>
      </VStack>
      <Divider />
      <HStack justifyContent="space-between" w="full">
        <Text color={secondaryTextColor}>Total</Text>
        <Heading size="lg">${product.price + product.shippingPrice}</Heading>
      </HStack>
      <UserDetails />
      <PayPalScriptProvider
      options={{
        "client-id": "AUknOzgS5H3nPwIqTdoT2RDkYxthBoe4eY4DExJs_FDwbZpp-jMCBaaxO1hYqJyTilj8tJV7vnHdZtoH",
        components: "buttons",
        currency: "USD",
      }}
    >
      <PayPal currency={currency} showSpinner={false} product={product} /*{ parentColor={parentColor} }*/ />
    </PayPalScriptProvider>
    </VStack>
  );
};

export default Checkout;
import React, { useState, useEffect } from "react";
import { Box, VStack, Flex, } from "@chakra-ui/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import UserDetails from "./UserDetails";
import PayPal from "./PayPal";
import PurchaseSummary from "./PurchaseSummary";

const Checkout = (props) => {
  const { product, onPaymentReceived, userCredentialInfo } = props;
  const currency = "USD";
  const [shippingAddress, setShippingAddress] = useState(null);
  const [addressSaved, setAddressSaved] = useState(false);

  const handleShippingAddressChange = (address) => {
    setShippingAddress(address);
    console.log("shipping address function called");
    // console.log(shippingAddress.address);
  };

  useEffect(() => {
    console.log("shipping address function called");
    console.log(shippingAddress);
  }, [shippingAddress]);

  return (
    <Flex direction={{ base: "column", lg: "row" }} alignItems="stretch" gap={4}>
      <Box flex={2}>
        <UserDetails onShippingAddressChange={handleShippingAddressChange} />
      </Box>
      <Box flex={2}>
        <VStack spacing={2} alignItems="stretch">
          <PurchaseSummary product={product} />

          <PayPalScriptProvider
            options={{
              "client-id": process.env.REACT_APP_CLIENT_ID,
              components: "buttons",
              currency: "USD",
            }}
          >
            <PayPal
              currency={currency}
              showSpinner={false}
              product={product}
              shippingAddress={shippingAddress}
              onPaymentReceived={onPaymentReceived}
              userCredentialInfo={userCredentialInfo}
            />
          </PayPalScriptProvider>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Checkout;

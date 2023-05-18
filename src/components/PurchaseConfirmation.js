import React, { useState, useEffect } from "react";
import { Text, Box, Button } from '@chakra-ui/react';
import ProductList from "./ProductList";

function PurchaseConfirmation(props) {
  const { setFormVisibleOnPage } = props;

  return (
    <React.Fragment>
      <Box >
        <Text fontWeight={"bold"}>Thanks for shopping with us!</Text>

        Enjoy your purchase!<br />
        {/* <ProductList productList={props.product} /> */}

      </Box>
    </React.Fragment>
  );

}

export default PurchaseConfirmation;
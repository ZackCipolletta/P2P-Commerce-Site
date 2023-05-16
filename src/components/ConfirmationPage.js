import ProductForm from "./ProductForm";
import { handleImageUpload } from "./ImageUpload";
import React, { useState, useEffect } from "react";
import { Text, Box, Button } from '@chakra-ui/react';
import Product from "./Product";

function ConfirmationPage(props) {
  const { removeFromCart, setFormVisibleOnPage } = props;

  return (
    <React.Fragment>
      <Box >
        <Text fontWeight={"bold"}>Listing completed</Text>
        Your listing is now live! <br /><br />
        <Button onClick={() => setFormVisibleOnPage(true)}>Sell another item</Button>
      </Box>
    </React.Fragment>
  );

}

export default ConfirmationPage;
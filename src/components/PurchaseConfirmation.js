import React, { } from "react";
import { Text, Box } from '@chakra-ui/react';

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
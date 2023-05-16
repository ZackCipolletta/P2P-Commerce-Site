import React from "react";
import { Box, Button, Text, Flex, Divider, Grid } from '@chakra-ui/react';

function ProductDetail(props) {
  // pulling props from the product list.  All of these props are fields
  // stored in firebase and the product list is being pulled from firebase.

  // deconstructing props so we do not have to keep typing props{...} over and over again.
  const { product, userCredentialInfo } = props;

  // redefining the userCredentials to be easier to read and reason about.
  const userEmail = userCredentialInfo ? userCredentialInfo.email : null;

  return (
    <Box border="1px solid gray" p={4} w="750px" h="600px" mx="auto">
      <Grid templateColumns="repeat(2, 1fr)" gap={4} h="100%">
        <Box>
          <img
            src={product.imageUrl}
            alt="product"
            style={{
              maxWidth: "400px",
              minWidth: "250px",
              maxHeight: "400px",
              minHeight: "250px",
              margin: "auto",
              display: "block",
              width: "auto",
              height: "auto"
            }}
          />
        </Box>
        <Box  mt={4} pt={4}>
          <Text fontWeight="bold" textAlign="left" mb={2}>
            {product.title}
          </Text>
          <Text textAlign="left" mb={2}>
            Description: {product.description}
          </Text>
          <Text textAlign="left" mb={5} pb={5}>
            Price: ${product.price}
          </Text>

          {/* Here we are checking if the user (email) stored as a property of the product in firebase matches the current user's email
        If the email is a match, we know the currently signed in user created the selected product and we give them the option 
        of editing the product. Otherwise the user only has the option to add it to their cart.*/}
          {product.user !== userEmail ? (
            <Button
              onClick={props.onClickingBuy}
              colorScheme="blue"
              variant="solid"
              mt={4}
            >
              Add to cart
            </Button>
          ) : (
            <Button
              onClick={props.onClickingEdit}
              colorScheme="green"
              variant="solid"
              mt={4}
            >
              Edit
            </Button>
          )}
        </Box>
        <Box gridColumn="1" gridRow="2">
          <Box id="seller">
            <Divider />
            <Text>Sold by: {product.user}</Text>
          </Box>
        </Box>
        <Box gridColumn="2" gridRow="2">
          <Box id="overView">
            <Divider />
            <Text fontWeight="bold">Overview</Text>
            <Text>Condition: {product.condition}</Text>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default ProductDetail;
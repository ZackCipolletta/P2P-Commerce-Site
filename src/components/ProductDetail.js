import React from "react";
import { Box, Button, Text, Flex, Divider, Grid, SimpleGrid } from '@chakra-ui/react';
import Product from "./Product";

function ProductDetail(props) {
  // pulling props from the product list.  All of these props are fields
  // stored in firebase and the product list is being pulled from firebase.

  // deconstructing props so we do not have to keep typing props{...} over and over again.
  const { userCredentialInfo } = props;

  // redefining the userCredentials to be easier to read and reason about.
  const userEmail = userCredentialInfo ? userCredentialInfo.email : null;

  const sellerList = props.productList.filter(product => product.user === props.product.user);

  return (
    <React.Fragment>
      {/* If we want to utilize an X here to close out of the details page we will need ot find a way
      to do so which will conditionally send us back to either the user account page, cart page, or the main list
      depending on where we came from.
       <Text mb={-5} pb={-5} >X</Text>  */}
      <Box border="1px solid gray" p={4} w="750px" h="600px" mx="auto">
        <Grid templateColumns="repeat(2, 1fr)" gap={4} h="100%">

          <Box>
            <img
              src={props.product.imageUrl}
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
          <Box mt={4} pt={4}>
            <Text fontWeight="bold" textAlign="left" mb={2}>
              {props.product.title}
            </Text>
            <Text textAlign="left" mb={2}>
              Description: {props.product.description}
            </Text>
            <Text textAlign="left" mb={5} pb={5}>
              Price: ${props.product.price}
            </Text>

            {/* Here we are checking if the user (email) stored as a property of the product in firebase matches the current user's email
        If the email is a match, we know the currently signed in user created the selected product and we give them the option 
        of editing the product. Otherwise the user only has the option to add it to their cart.*/}
            {props.product.user !== userEmail ? (
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
              <Text>Sold by: {props.product.user}</Text>
            </Box>
          </Box>
          <Box gridColumn="2" gridRow="2">
            <Box id="overView">
              <Divider />
              <Text fontWeight="bold">Overview</Text>
              <Text>Condition: {props.product.condition}</Text>
            </Box>
          </Box>
        </Grid>
        <Text fontWeight={"bold"}>More from this seller</Text>
        <SimpleGrid columns={3} spacing={10}>
      {sellerList.map((product) =>
        <Product
          whenProductClicked={props.onProductSelection}
          imageUrl={product.imageUrl}
          title={product.title}
          description={product.description}
          condition={product.condition}
          price={product.price}
          user={product.user}
          id={product.id}
          key={product.id}
        />
        )}
      </SimpleGrid>
      </Box>
    </React.Fragment>
  );
}

export default ProductDetail;
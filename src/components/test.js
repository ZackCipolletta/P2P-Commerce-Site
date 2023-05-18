import React, { useState } from "react";
import { Box, Button, Text, Divider, Grid, SimpleGrid } from '@chakra-ui/react';
import Product from "./Product";
import ProductList from "./ProductList";

function ProductDetail(props) {
  // here we set the initial value of isShipped based on the value of 'shipped' in the database for the selected item.
  // this way if the item is marked shipped in the database, the value of isShipped will be set to true
  // which will update our page accordingly.
  const [isShipped, setIsShipped] = useState(props.product.shipped);

  const handleMarkAsShipped = () => {
    props.markAsShipped(props.product);
    setIsShipped(true);
  };

  // pulling props from the product list.  All of these props are fields
  // stored in firebase and the product list is being pulled from firebase.

  // deconstructing props so we do not have to keep typing props{...} over and over again.
  const { userCredentialInfo } = props;

  // redefining the userCredentials to be easier to read and reason about.
  const userEmail = userCredentialInfo ? userCredentialInfo.email : null;

  const sellerList = props.productList.filter(product => product.user === props.product.user);

  return (
    <React.Fragment>
      {/* If we want to utilize an X here to close out of the details page we will need to find a way
      to do so, which will conditionally send us back to either the user account page, cart page, or the main list
      depending on where we came from.
       <Text mb={-5} pb={-5} >X</Text>  */}
      <Box border="1px solid gray" p={4} w="850px" h="650px" mx="auto">
        <Grid templateColumns="repeat(2, 1fr)" gap={4} h="100%">

          <Box gridColumn="1" gridRow="1">
            <img
              src={props.product.imageUrl}
              alt="product"
              style={{
                maxWidth: "400px",
                minWidth: "250px",
                maxHeight: "350px",
                minHeight: "250px",
                margin: "auto",
                display: "block",
                width: "auto",
                height: "auto"
              }}
            />
            {/* Move the shipping address box here */}
            {!props.product.active && props.product.user === userEmail && (
              <Box mt={4} mb={-7} ml={20}>
                <Text fontWeight="bold" fontSize={"md"} textAlign="left">Shipping Address:</Text>
                <Text fontSize={"md"} textAlign="left">{props.product.shippingAddress.firstName} {props.product.shippingAddress.lastName}</Text>
                <Text fontSize={"md"} textAlign="left">{props.product.shippingAddress.address}</Text>
                <Text fontSize={"md"} textAlign="left">{props.product.shippingAddress.city}</Text>
                <Text fontSize={"md"} textAlign="left">{props.product.shippingAddress.state}</Text>
                <Text fontSize={"md"} textAlign="left">{props.product.shippingAddress.country}</Text>
              </Box>
            )}
          </Box>

          <Box gridColumn="2" gridRow="1" mt={4} pt={4}>
            <Text fontWeight="bold" textAlign="left" mb={2}>
              {props.product.title}
            </Text>
            <Box
              textAlign="left"
              mb={2}
              maxHeight={"250px"}
              overflowY={"auto"}
            >
              <Text>
                Description: {props.product.description}
              </Text>
            </Box>
            <Text textAlign="left" mb={3} pb={3}>
              Price: ${props.product.price}
            </Text>
            <Text textAlign="left" mb={3} pb={3}>
              +Shipping fee: ${props.product.shippingPrice}
            </Text>

            {/* Rest of the code */}
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
      </Box>

      {props.product.user !== userEmail && (
        <React.Fragment>
          <Text fontWeight={"bold"}>More from this seller</Text>
          <ProductList productList={sellerList} onProductSelection={props.onProductSelection} />
        </React.Fragment>
      )}
    </React.Fragment>
  );

}

export default ProductDetail;



{/* Here we are checking if the user (email) stored as a property 
            of the product in firebase matches the current user's email. 
            If the email is a match, we know the currently signed in user created 
        the selected product and we give them the option of editing the product. 
        Otherwise the user only has the option to add it to their cart.*/}





        return (
          <React.Fragment>
            {/* If we want to utilize an X here to close out of the details page we will need to find a way
            to do so which will conditionally send us back to either the user account page, cart page, or the main list
            depending on where we came from.
             <Text mb={-5} pb={-5}>X</Text> */}
            <Box border="1px solid gray" p={4} w="850px" h="650px" mx="auto">
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
                  {!props.product.active && props.product.user === userEmail && (
                    <Box mt={4} mb={-7} ml={20}>
                      <Text fontWeight="bold" fontSize="md" textAlign="left">
                        Shipping Address:
                      </Text>
                      <Text fontSize="sm" textAlign="left">
                        {props.product.shippingAddress.firstName}{" "}
                        {props.product.shippingAddress.lastName}
                      </Text>
                      <Text fontSize="sm" textAlign="left">
                        {props.product.shippingAddress.address}
                      </Text>
                      <Text fontSize="sm" textAlign="left">
                        {props.product.shippingAddress.city}
                      </Text>
                      <Text fontSize="sm" textAlign="left">
                        {props.product.shippingAddress.state}
                      </Text>
                      <Text fontSize="sm" textAlign="left">
                        {props.product.shippingAddress.country}
                      </Text>
                    </Box>
                  )}
                </Box>
        
                <Box gridColumn="2" gridRow="1" mt={4} pt={4}>
                  <Text fontWeight="bold" textAlign="left" mb={2}>
                    {props.product.title}
                  </Text>
                  <Box textAlign="left" mb={2} maxHeight="250px" overflowY="auto">
                    <Text fontSize="sm">
                      Description: {props.product.description}
                    </Text>
                  </Box>
                  <Text textAlign="left" mb={3} pb={3}>
                    Price: ${props.product.price}
                  </Text>
                  <Text textAlign="left" mb={3} pb={3}>
                    +Shipping fee: ${props.product.shippingPrice}
                  </Text>
        
                  {!props.product.active && props.product.user === userEmail && (
                    <Box position="relative">
                      <Button
                        onClick={handleMarkAsShipped}
                        display={isShipped ? "none" : "block"}
                      >
                        Mark Shipped
                      </Button>
                      {isShipped && (
                        <Text
                          position="absolute"
                          top="0"
                          left="0"
                          width="100%"
                          textAlign="center"
                          fontWeight="bold"
                          color="green"
                        >
                          Shipped
                        </Text>
                      )}
                    </Box>
                  )}
        
                  {props.product.active && (
                    props.product.user === userEmail ? (
                      <Button
                        onClick={props.onClickingEdit}
                        colorScheme="green"
                        variant="solid"
                        mt={4}
                      >
                        Edit
                     
                        
                        
        
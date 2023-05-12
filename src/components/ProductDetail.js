import React from "react";
import Product from "./Product";
import { Box, Button } from '@chakra-ui/react';

function ProductDetail(props) {
  // pulling props from the product list.  All of these props are fields
  // stored in firebase and the product list is being pulled from firebase.
  
  // deconstructing props so we do not have to keep typing props{...} over and over again.
  const { product, userCredentialInfo } = props;

  // redefining the userCredentials to be easier to read and reason about.
  const userEmail = userCredentialInfo ? userCredentialInfo.email : null;

  return (
    <React.Fragment>
      {console.log("From details, user info is: ")}
      {console.log(userEmail)}
      <Box border="1px solid gray"
        p={4} w="750px"
        h="600px"
        mx="auto">
        <div>
          <p><img src={product.imageUrl}
            alt="product"
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              margin: "auto",
              display: "block",
              width: "auto",
              height: "auto"
            }} /></p>
          <p>Seller: {product.user}</p> 
        </div>

        <p>Title: {product.title}</p>
        <p>Description: {product.description}</p>
        <p>Price: ${product.price}</p>
        {/* <Button className="btn btn-primary">Add to cart</Button> */}

        {/* Here we are checking if the user (email) stored as a property of the product in firebase matches the current user's email
        If the email is a match, we know the currently signed in user created the selected product and we give them the option 
        of editing the product. Otherwise the user only has the option to add it to their cart.*/}
        {product.user !== userEmail ?
          <Button
            className="btn btn-primary">
            Add to cart
          </Button> :
          <Button
            onClick={props.onClickingEdit}
            className="btn btn-primary">
            Edit
          </Button>}
        <p>Condition: {product.condition}</p>
      </Box>
    </React.Fragment>
  );
}

export default ProductDetail;
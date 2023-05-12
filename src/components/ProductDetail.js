import React from "react";
import Product from "./Product";
import { Box, Button } from '@chakra-ui/react';

function ProductDetail(props) {

  const user = props.userCredentialInfo
  const userEmail = user ? user.email : null;

  return (
    <React.Fragment>
      {console.log("From details, user info is: ")}
      {console.log(userEmail)}
      <Box border="1px solid gray" p={4} w="750px" h="600px" mx="auto">
        <div>
          <p><img src={props.product.imageUrl} alt="product" style={{ maxWidth: "300px", maxHeight: "300px", margin: "auto", display: "block", width: "auto", height: "auto" }} /></p>
          <p>Seller: {props.product.user}</p> {/* pulling props from the product list.  All of these props are fields stored in firebase and the product list is being pulled from firebase. */}
        </div>

        <p>Title: {props.product.title}</p>
        <p>Description: {props.product.description}</p>
        <p>Price: ${props.product.price}</p>
        {/* <Button className="btn btn-primary">Add to cart</Button> */}
        {props.product.user !== userEmail ? <Button className="btn btn-primary">Add to cart</Button> :
          <Button onClick={props.onClickingEdit} className="btn btn-primary">Edit</Button>}
        <p>Condition: {props.product.condition}</p>
      </Box>
    </React.Fragment>
  );
}

export default ProductDetail;
import React from "react";
import Product from "./Product";
import PropTypes from "prop-types";
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, SimpleGrid } from '@chakra-ui/react';

function ProductList(props) {

  const user = props.userCredentialInfo
  const userEmail = user ? user.email : null;

  return (
    <React.Fragment>
      {console.log("user is: ")}
      {console.log(userEmail)}
      <hr />
      
      <SimpleGrid columns={3} spacing={10}>
      {props.productList.map((product) =>
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
    </React.Fragment>
  );
}

ProductList.propTypes = {
  onProductSelection: PropTypes.func
}

export default ProductList;
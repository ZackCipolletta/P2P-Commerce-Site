import React from "react";
import Product from "./Product";
import PropTypes from "prop-types";
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, SimpleGrid } from '@chakra-ui/react';

function ProductList(props) {
  return (
    <React.Fragment>
      <hr />
      <SimpleGrid columns={3} spacing={10}>
      {props.productList.map((product) =>
        <Product
          whenProductClicked={props.onProductSelection}
          image={product.image}
          title={product.title}
          description={product.description}
          condition={product.condition}
          price={product.price}
          seller={product.seller}
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
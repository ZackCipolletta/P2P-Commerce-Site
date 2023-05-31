import React from "react";
import { SimpleGrid, Card, Text } from '@chakra-ui/react';
import Product from "./Product";
import ProductList from "./ProductList";

function UserAccount(props) {

  // We take the productList which was passed in by the Control component, and already loaded on first visiting the site, and filter to only select products with a user property equal to the currently signed in user's email.
  const userList = props.productList.filter(product => product.user === props.userCredentialInfo.email);

  const query = "straw";
  const filteredProductList = props.productList.filter(
  (product) => product.title.includes(query)
);

  // here we filter the completed listings list for items that have been sold and display them for users
  // as either items they have purchased or sold.
  const purchasedList = props.completedProductListings.filter
    (product => product.purchaser === props.userCredentialInfo.email);

  // here we filter down further to items that a seller needs to ship or not
  const soldList = props.completedProductListings.filter
    (product => product.user === props.userCredentialInfo.email
      && product.shipped === true);

  const toBeShipped = props.completedProductListings.filter
    (product => 
      product.user === props.userCredentialInfo.email
      && product.shipped === false
  );
  

  return (
    <React.Fragment>
      <Text>To be shipped: </Text>
      <ProductList productList={toBeShipped}
        onProductSelection={props.onProductSelection} />
      
      <Text>Sold items: </Text>
      <ProductList productList={soldList}
      onProductSelection={props.onProductSelection}/>

      <Text>Items you are selling: </Text>
      <ProductList productList={userList}
      onProductSelection={props.onProductSelection}/>

      <Text>Purchased items: </Text>
      <ProductList productList={purchasedList}
      onProductSelection={props.onProductSelection}/>

    </React.Fragment>
  );

}

export default UserAccount;
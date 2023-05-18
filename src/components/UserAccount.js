import React from "react";
import { SimpleGrid, Card, Text } from '@chakra-ui/react';
import Product from "./Product";
import ProductList from "./ProductList";

function UserAccount(props) {

  // We take the productList which was passed in by the Control component, and already loaded on first visiting the site, and filter to only select products with a user property equal to the currently signed in user's email.
  const userList = props.productList.filter(product => product.user === props.userCredentialInfo.email);

  const purchasedList = props.completedProductListings.filter(product => product.purchaser === props.userCredentialInfo.email);
  const soldList = props.completedProductListings.filter(product => product.user === props.userCredentialInfo.email);
  console.log(props.userCredentialInfo);

  return (
    <React.Fragment>
      <Text>Sold items: </Text>
      <ProductList productList={soldList} />

      <Text>Items you are selling: </Text>
      <ProductList productList={userList} />

      <Text>Purchased items: </Text>
      <ProductList productList={purchasedList} />

    </React.Fragment>
  );

}

export default UserAccount;
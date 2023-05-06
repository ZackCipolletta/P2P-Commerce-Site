import React from "react";
import Product from "./Product";

function ProductDetail(props) {


  




  return (
    <React.Fragment>
      <p>Title: {props.product.title}</p>
      <p>Condition: {props.product.condition}</p>
      <p>Price: ${props.product.price}</p>
      <p>Description: {props.product.description}</p>
      <p>Seller: {props.product.seller}</p>
    </React.Fragment>
  )
}

export default ProductDetail;
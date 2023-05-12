import React from "react";
// import PropTypes from "prop-types";
import ProductForm from "./ProductForm";

function EditProduct(props) {


  return (
    <React.Fragment>
      <p> This is the edit page</p>
      <ProductForm product={props.productToEdit} />
    </React.Fragment>
  );

}

export default EditProduct;
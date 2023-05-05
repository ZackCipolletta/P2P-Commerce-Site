import React from "react";
import PropTypes from "prop-types";
import { Box } from '@chakra-ui/react';
import ProductForm from "./ProductForm";
import Product from "./Product";

function NewProductForm(props) {

  function handleNewProductFormSubmission(event) {
    event.preventDefault();
    props.onNewProductCreation({
      title: event.target.title.value,
      description: event.target.description.value,
      condition: event.target.condition.value,
      price: event.target.price.value,
      shippingPrice: event.target.shippingPrice.value,
    });
  }

  return (
    <React.Fragment>
      <ProductForm
        formSubmissionHandler={handleNewProductFormSubmission}
        buttonText="Submit" />
    </React.Fragment>
  );

}

NewProductForm.propTypes = {
  onNewProductCreation: PropTypes.func
};

export default NewProductForm;
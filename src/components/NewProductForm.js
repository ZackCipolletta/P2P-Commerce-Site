import React from "react";
import PropTypes from "prop-types";
import { Box } from '@chakra-ui/react';
import ProductForm from "./ProductForm";
import Product from "./Product";

function NewProductForm(props) {

  const { onNewProductCreation } = props; // Destructuring props to extract onNewProductCreation

  function handleNewProductFormSubmission(event) {
      


    
    event.preventDefault();
    onNewProductCreation({ // Using onNewProductCreation extracted from props
      title: event.target.title.value,
      description: event.target.description.value,
      // condition: event.target.condition.value,
      image: event.target.image.value,
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
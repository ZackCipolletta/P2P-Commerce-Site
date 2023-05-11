import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box } from '@chakra-ui/react';
import ProductForm from "./ProductForm";
import Product from "./Product";


function NewProductForm(props) {

  const [imageURL, setImageURL] = useState(null);

  function handleImageUpload(downloadURL) {
    setImageURL(downloadURL);
  }

  function handleNewProductCreation(
    title,
    description,
    condition,
    price,
    shippingPrice
    

  ) {
    const newProduct = {
      title: title,
      description: description,
      condition: condition,
      price: price,
      shippingPrice: shippingPrice,
      imageURL: imageURL,
      // user: props.user
    };

    console.log(props.user);
    console.log(title)
    console.log("title and user should be above")
    props.onNewProductCreation(newProduct);
  }


  // function handleNewProductCreation(event, downloadURL) {
  //   // event.preventDefault();
  //   props.onNewProductCreation({ // Using onNewProductCreation extracted from props
  //     title: event.target.title.value,
  //     description: event.target.description.value,
  //     condition: event.target.condition.value,
  //     price: event.target.price.value,
  //     shippingPrice: event.target.shippingPrice.value,
  //     imageURL: downloadURL
  //   });
  // }


  return (
    <React.Fragment>
      <ProductForm
        // onImageUpload={handleImageUpload}
        formSubmissionHandler={handleNewProductCreation}
        userCredentialInfo={props.userCredentialInfo}
        buttonText="Submit" />
    </React.Fragment>
  );

}

NewProductForm.propTypes = {
  onNewProductCreation: PropTypes.func
};

export default NewProductForm;
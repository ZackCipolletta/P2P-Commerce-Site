
// import PropTypes from "prop-types";
import ProductForm from "./ProductForm";
import { handleImageUpload } from "./ImageUpload";
import React, { useState, useEffect } from "react";

function EditProduct(props) {
  const { productToEdit } = props;

  // const [imageUpload, setImageUpload] = useState(null);
  // const [isUploading, setIsUploading] = useState(false);
  // const [imageDownloadURL, setImageDownloadURL] = useState(null);

  function handleEditProductFormSubmission(event) {
    // event.preventDefault();
    props.onEditProduct({
      title: event.target.title.value,
      description: event.target.description.value,
      condition: event.target.condition.value,
      price: event.target.price.value,
      shippingPrice: event.target.shippingPrice.value,
      id: productToEdit.id
    });
  }

  return (
    <React.Fragment>
      <p> This is the edit page</p>
      <ProductForm product={props.productToEdit}
        formSubmissionHandler={handleEditProductFormSubmission}
        // imageUpload={imageUpload}
        // setImageUpload={setImageUpload}
        buttonText="Edit Product"/>
    </React.Fragment>
  );

}

export default EditProduct;
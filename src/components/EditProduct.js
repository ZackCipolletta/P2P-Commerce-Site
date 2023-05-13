
// import PropTypes from "prop-types";
import ProductForm from "./ProductForm";
import { handleImageUpload } from "./ImageUpload";
import React, { useState, useEffect } from "react";

function EditProduct(props) {
  const { productToEdit } = props;

  // const [imageUpload, setImageUpload] = useState(null);
  // const [isUploading, setIsUploading] = useState(false);
  // const [imageDownloadURL, setImageDownloadURL] = useState(null);

  function handleEditProductFormSubmission(imageDownloadURL) {
    const form = document.getElementById('productForm');
    const formData = new FormData(form);
    props.onEditProduct({
      title: formData.get("title"),
      description: formData.get("description"),
      condition: formData.get("condition"),
      price: parseFloat(formData.get("price")),
      shippingPrice: parseFloat(formData.get("shippingPrice")),
      imageUrl: imageDownloadURL,
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
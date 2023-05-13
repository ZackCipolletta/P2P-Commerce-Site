import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";
import { db } from "../firebase";
import { storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { handleImageUpload } from "./ImageUpload";

function NewProductForm(props) {

  // const [imageUpload, setImageUpload] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  // const [imageDownloadURL, setImageDownloadURL] = useState(null);

  const user = props.userCredentialInfo
  const userEmail = user ? user.email : null;

  const handleSubmit = (imageDownloadURL) => {
    if (!imageDownloadURL) {
      alert("Please upload an image.");
      return;
    }
    setIsUploading(true);
    const form = document.getElementById('productForm');
    const formData = new FormData(form);
    console.log(formData.get("title"));
    console.log(props.userCredentialInfo);
    const productData = {
      title: formData.get("title"),
      description: formData.get("description"),
      condition: formData.get("condition"),
      price: parseFloat(formData.get("price")),
      shippingPrice: parseFloat(formData.get("shippingPrice")),
      imageUrl: imageDownloadURL,
      user: userEmail
    };
    addDoc(collection(db, "products"), productData)
      .then(() => {
        alert("Product added!");
        setIsUploading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      <ProductForm
        userCredentialInfo={props.userCredentialInfo}
        formSubmissionHandler={handleSubmit}
        buttonText="Submit" />
    </React.Fragment>
  );
}

NewProductForm.propTypes = {
  onNewProductCreation: PropTypes.func
};

export default NewProductForm;
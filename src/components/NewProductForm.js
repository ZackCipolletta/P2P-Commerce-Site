import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from '@chakra-ui/react';
import ProductForm from "./ProductForm";
import Product from "./Product";
import { v4 } from "uuid";
import { db } from "../firebase";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";


function NewProductForm(props) {

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);

  const user = props.userCredentialInfo
  const userEmail = user ? user.email : null;

  const handleImageUpload = (event) => {
    event.preventDefault();
    console.log("submit clicked1")
    if (imageUpload == null) return;
    console.log("submit clicked2")
    setIsUploading(true);
    const imageRef = ref(storage, `productImages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        return snapshot.metadata.fullPath;
      })
      .then((path) => {
        return getDownloadURL(imageRef);
      })
      .then((downloadURL) => {
        alert("Image Uploaded");
        console.log(downloadURL);
        setImageDownloadURL(downloadURL);
        setIsUploading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = () => {
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
        handleImageUpload={handleImageUpload}
        handleSubmit={handleSubmit}
        imageUpload={imageUpload}
        setImageUpload={setImageUpload}
        imageDownloadURL={imageDownloadURL}
        setImageDownloadURL={setImageDownloadURL}

        buttonText="Submit" />
    </React.Fragment>
  );
}

NewProductForm.propTypes = {
  onNewProductCreation: PropTypes.func
};

export default NewProductForm;
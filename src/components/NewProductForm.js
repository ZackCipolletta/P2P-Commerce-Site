import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";
import { db } from "../firebase";
import { storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { handleImageUpload } from "./ImageUpload";

function NewProductForm(props) {

  const [isUploading, setIsUploading] = useState(false);

  // here we destructure props to be able to make it easier to understand and reason about.
  const user = props.userCredentialInfo;
  const userEmail = user ? user.email : null;

  const handleSubmit = (imageDownloadURL) => {
    if (!imageDownloadURL) {
      alert("Please upload an image.");
      return;
    }
    setIsUploading(true);
    const form = document.getElementById('productForm');
    const formData = new FormData(form);
    const productData = {
      title: formData.get("title"),
      description: formData.get("description"),
      condition: formData.get("condition"),
      // the inner parseFloat converts the data from the form and converts it to a number
      // toFixed then returns a string form of the number with 2 decimal places
      // the outer parseFloat then converts the string with two decimals back into a number
      // You can use a regex here to validate the input and ensure there, at most, 2 decimal places, but I feel the most important thing at the moment is functionality, so I will tackle that after the edit form, cart and checkout are fully functioning.
      price: parseFloat(parseFloat(formData.get("price")).toFixed(2)),
      shippingPrice: parseFloat(parseFloat(formData.get("shippingPrice")).toFixed(2)),
      imageUrl: imageDownloadURL,
      user: userEmail,
      active: true,
      shipped: false,
      purchaser: null,
      shippingAddress: null

    };
    addDoc(collection(db, "products"), productData)
      .then(() => {
        setIsUploading(false); // or below here is where we call our new func to display the confirmation page
        props.setConfirmationVisible(true);
        props.setFormVisibleOnPage(false);
        
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      <ProductForm
        // we are passing in the user credentials so they can later be used to assign a users email to a product on creation.
        // this way we can track which user has created a product, so we know who the seller is.
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
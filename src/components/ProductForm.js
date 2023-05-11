import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { v4 } from "uuid";
import { db } from "../firebase";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";


function ProductForm(props) {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);

  const user = props.userCredentialInfo
  const userEmail = user ? user.email : null;

  useEffect(() => {
    if (imageDownloadURL) {
      handleSubmit();
    }
  }, [imageDownloadURL]);
  
  const handleImageUpload = (event) => {
    event.preventDefault();
    if (imageUpload == null) return;
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
      <Box className="border p-4" textAlign="left">
        <form onSubmit={handleImageUpload} id="productForm" >

          <p>Title:
            <input
              type="text"
              name="title"
              placeholder="What are you selling?"
            />
          </p>
          <p>
            <span
              style={{ verticalAlign: 'top' }}>
              Description:
            </span>
            <textarea
              type="textarea"
              name="description"
              placeholder="Enter your description here"
              style={{ width: "500px", height: "100px", resize: "both" }}
            />
          </p>
          <p>Upload image:
            <input type="file"
              id="file-input"
              name="image"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
                setImageUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </p>
          {imageUrl && <img src={imageUrl}
            alt="Preview"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />}
          <p>Condition:
            <select name="condition">
              <option value="new">New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </p>
          <p>Price:
            <input
              type="number"
              name="price"
              placeholder="0"
              step="0.01"
            />
          </p>
          <p>Shipping Price:
            <input
              type="number"
              name="shippingPrice"
              placeholder="0"
            />
          </p>
          Total cost calculate: $$$
          <span>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {props.buttonText}
            </button>
          </span>
        </form>
      </Box>
    </React.Fragment >
  );
}

ProductForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
};

export default ProductForm;
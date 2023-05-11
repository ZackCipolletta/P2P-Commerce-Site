import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { v4 } from "uuid";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ProductForm(props) {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = () => {
    if (imageUpload == null) return;
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
        // props.onImageUpload(downloadURL); // Passing the downloadURL to the parent component using a callback function
        console.log(downloadURL);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      <Box className="border p-4" textAlign="left">
        <form onSubmit={(e) => {
          e.preventDefault();
          props.formSubmissionHandler(e);
          uploadImage(e);
        }}>

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
            <button
              className="btn btn-secondary"
              onClick={uploadImage}>upload
            </button>
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
  buttonText: PropTypes.string
};

export default ProductForm;
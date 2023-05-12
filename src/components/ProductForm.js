import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

function ProductForm(props) {
  const [imageUrl, setImageUrl] = useState(null);

  // here we deconstruct the props passed down from NewProductForm. Names have been kept the same to make them easier to reason about.
  const { setImageUpload, formSubmissionHandler, product } = props;

  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [condition, setCondition] = useState(product?.condition || "");
  const [price, setPrice] = useState(product?.price || "");
  const [shippingPrice, setShippingPrice] = useState(product?.shippingPrice || "");
  
  return (
    <React.Fragment>
      <Box className="border p-4" textAlign="left">
        <form onSubmit={formSubmissionHandler} id="productForm" >
          <p>Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            <select name="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}>
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              step="0.01"
            />
          </p>
          <p>Shipping Price:
            <input
              type="number"
              name="shippingPrice"
              value={shippingPrice}
              onChange={(e) => setShippingPrice(e.target.value)}
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
  setImageUpload: PropTypes.func,
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  condition: PropTypes.string,
  price: PropTypes.number,
  shippingPrice: PropTypes.number,
};

export default ProductForm;
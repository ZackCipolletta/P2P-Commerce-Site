import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

function ProductForm(props) {

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <React.Fragment>
      <Box className="border p-4" textAlign="left">
        <form onSubmit={props.formSubmissionHandler}>
          <p>Title:
            <input type="text" name="title" placeholder="What are you selling?" />
          </p>
          <p>Description:
            <input type="text" name="description" placeholder="Enter your description here" />
          </p>
          <p>Upload image:
            <input type="file" id="file-input" name="image" />
            <span id="drop-zone" onChange={handleFileChange}>
            </span>
          </p>
          <p>Condition:
            <span>Some sort of buttons or radio selection indicating condition `(like new)` (New) (Good) (Fair) (Poor) </span>
          </p>
          <p>Price:
            <input type="number" name="price" placeholder="0" step="0.01" />
          </p>
          <p>Shipping Price:
            <input type="number" name="shippingPrice" placeholder="0" />
          </p>
          Total cost calculate: $$$
          <span>
            <button type="submit" className="btn btn-primary" >
              {props.buttonText}
            </button>
          </span>
        </form>
      </Box>
    </React.Fragment>
  );
}

ProductForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ProductForm;
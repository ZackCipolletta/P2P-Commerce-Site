import React from "react";
import PropTypes from "prop-types";
import { Box } from '@chakra-ui/react';

function NewProductForm(props) {

  return (
    <React.Fragment>
      <Box className="border p-4" textAlign="left">
        <form onSubmit={props.formSubmissionHandler}>
          <p>Title: <input type="text" name="title" placeholder="What are you selling?" /></p>
          <p>Description: <input type="text" name="description" placeholder="Enter your description here" /></p>
          <p>Condition: <span>Some sort of buttons or radio selection indicating condition `(like new)` (New) (Good) (Fair) (Poor) </span></p>

          <p>Price: <input type="number" name="price" placeholder="Enter price here" /></p>
          <p>Shipping Price: <input type="number" name="shippingPrice" placeholder="Enter shipping price here" /></p>

          Total cost calculate: $$$
          <span> <button type="button" className="btn btn-primary" >Submit</button></span>
        </form>
      </Box>
    </React.Fragment>
  );

}

NewProductForm.propTypes = {
  formSubmissionHandler: PropTypes.func
};

export default NewProductForm;
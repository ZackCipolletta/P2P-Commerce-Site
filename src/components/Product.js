import React from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.css';


function Product(props) {

  return (
    <React.Fragment>
      <div>{props.image}</div>
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <p>{props.condition}</p>
      <p><strong>{props.price}</strong></p>
      <p><em>{props.seller}</em></p>
    </React.Fragment>
  );
}

Product.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  condition: PropTypes.string,
  price: PropTypes.number,
  seller: PropTypes.string,
  image: PropTypes.string
};

export default Product;
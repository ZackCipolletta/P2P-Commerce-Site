import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ProductList from "./ProductList";
import NewProduct from "./NewProduct";
import { FaLessThanEqual } from "react-icons/fa";

function Control(props) {


  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);

  let CurrentlyVisibleState = null;

  if (formVisibleOnPage) {
    CurrentlyVisibleState = <NewProduct />;
  } else {
    CurrentlyVisibleState = <ProductList />;
  }

  return (
    <React.Fragment>
      {CurrentlyVisibleState}
    </React.Fragment>
  );

}

export default Control;
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ProductList from "./ProductList";

function Control(props) {

  let CurrentlyVisibleState = null;

  CurrentlyVisibleState = <ProductList />;

  return (
    <React.Fragment>
      {CurrentlyVisibleState}
    </React.Fragment>
  );

}

export default Control;
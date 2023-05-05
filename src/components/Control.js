import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ProductList from "./ProductList";
import NewProduct from "./NewProduct";
import { FaLessThanEqual } from "react-icons/fa";
import ProductDetail from "./ProductDetail";

function Control(props) {


  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainProductList, setMainProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);


  // useEffect(() => {
  //   const unSubscribe = onSnapshot(
  //     collection(db, "products"),
  //     (collectionSnapshot) => {
  //       const products = [];
  //       collectionSnapshot.forEach((doc) => {
  //         products.push({
  //           title: doc.data().title,
  //           description: doc.data().description,
  //           price: doc.data().price,
  //           condition: doc.data().condition,
  //           image: doc.data().image,
  //           seller: doc.data().seller
  //         });
  //       });
  //       setMainProductList(products);
  //     },
  //     (error) => {
  //       setError(error.message);
  //     }
  //   );
  //   return () => unSubscribe();
  // }, []);


  // const handleClick = () => {
  //   if (selectedProduct != null) {
  //     setSelectedProduct(null;)
  //   }
  // };

  const handleChangingSelectedProduct = (id) => {
    const selection = mainProductList.filter(product => product.id === id[0]);
    setSelectedProduct(selection);
  };


  let CurrentlyVisibleState = null;
  if (selectedProduct != null) {
    CurrentlyVisibleState = <ProductDetail
      product={selectedProduct} />;
  } else if (formVisibleOnPage) {
    CurrentlyVisibleState = <NewProduct />;
  } else {
    CurrentlyVisibleState = <ProductList
      onProductSelection={handleChangingSelectedProduct}
    />;
  }

  return (
    <React.Fragment>
      {CurrentlyVisibleState}
    </React.Fragment>
  );

}

export default Control;
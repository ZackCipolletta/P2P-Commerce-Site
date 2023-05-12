import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ProductList from "./ProductList";
import NewProduct from "./NewProduct";
import ProductDetail from "./ProductDetail";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc, query, orderBy } from "firebase/firestore";
import NewProductForm from "./NewProductForm";
import { Route, Routes, Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

function Control(props) {

  // const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainProductList, setMainProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  const { formVisibleOnPage, setFormVisibleOnPage, userCredentialInfo } = props;

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "products"),
      (collectionSnapshot) => {
        const products = [];
        collectionSnapshot.forEach((doc) => {
          products.push({
            title: doc.data().title,
            description: doc.data().description,
            price: doc.data().price,
            condition: doc.data().condition,
            imageUrl: doc.data().imageUrl,
            user: doc.data().user,
            id: doc.id
          });
        });
        setMainProductList(products);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  // onResetForm();


  const handleClick = () => {
    if (selectedProduct != null) {
      // onResetForm();
      setFormVisibleOnPage(false);
      setSelectedProduct(null);
    } else {

    }
    setFormVisibleOnPage(false);
    console.log("handleClick reached");
  };

  const handleChangingSelectedProduct = (id) => {
    const selection = mainProductList.filter(product => product.id === id)[0];
    console.log("product id: " + id);
    console.log(selection.title);
    console.log(selection);
    setSelectedProduct(selection);
  };

  const handleAddingNewProductToList = async (newProductData) => {
    await addDoc(collection(db, "products"), newProductData);
    setFormVisibleOnPage(false);
  };

  // onClick={() => props.whenProductClicked(props.id)}>


  let CurrentlyVisibleState = null;
  let buttonText = null;

  if (selectedProduct != null) {
    CurrentlyVisibleState = <ProductDetail
      userCredentialInfo={userCredentialInfo}
      product={selectedProduct} />;
    buttonText = "Return to list of products";
  } else if (formVisibleOnPage) {
    CurrentlyVisibleState = <NewProductForm
      onNewProductCreation={handleAddingNewProductToList}
      userCredentialInfo={userCredentialInfo} />;
    buttonText = "Return to list of products";
  } else if (editing) {
    CurrentlyVisibleState = <NewProductForm
      onNewProductCreation={handleAddingNewProductToList}
      userCredentialInfo={userCredentialInfo} />;
    buttonText = "Return to list of products";

  } else {
    CurrentlyVisibleState = <ProductList
      onProductSelection={handleChangingSelectedProduct}
      productList={mainProductList}
      userCredentialInfo={userCredentialInfo}
    />;
  }

  return (
    <React.Fragment>
      {CurrentlyVisibleState}
      <button onClick={() => { handleClick(); }} className="btn btn-primary">{buttonText}</button>
    </React.Fragment>
  );
}

export default Control;



// return (
//   <React.Fragment>
//     <Router>
//       <Routes>
//         <Route path="/" element={<ProductPage currentlyVisibleState={currentlyVisibleState} onClick={handleClick} />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </Router>
//   </React.Fragment>
// );
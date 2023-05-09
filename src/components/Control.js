import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ProductList from "./ProductList";
import NewProduct from "./NewProduct";
import { FaLessThanEqual } from "react-icons/fa";
import ProductDetail from "./ProductDetail";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc, query, orderBy } from "firebase/firestore";
import NewProductForm from "./NewProductForm";


function Control(props) {


  const [formVisibleOnPage, setFormVisibleOnPage] = useState(true);
  const [mainProductList, setMainProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  const handleAddingNewProductToList = async (newProductData) => {


    /////////////////////////////////////////////////////////////////////////////////////////////////
    await addDoc(collection(db, "products"), newProductData);
    setFormVisibleOnPage(false);
  };

  const testPrint = () => {
    console.log("This test worked");
  };


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
            image: doc.data().image,
            seller: doc.data().seller,
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


  const handleClick = () => {
    if (selectedProduct != null) {
      setFormVisibleOnPage(null);
      setSelectedProduct(null);

    }
  };

  const handleChangingSelectedProduct = (id) => {
    const selection = mainProductList.filter(product => product.id === id)[0];
    console.log("product id: " + id);
    console.log(selection.title);
    console.log(selection);
    setSelectedProduct(selection);
  };


  let CurrentlyVisibleState = null;
  let buttonText = null;

  if (selectedProduct != null) {
    CurrentlyVisibleState = <ProductDetail
      product={selectedProduct} />;
    buttonText = "Return to list of products";
  } else if (formVisibleOnPage) {
    CurrentlyVisibleState = <NewProductForm
      onNewProductCreation={handleAddingNewProductToList}
      buttonText="Return to list of products"
    />;
  } else {
    CurrentlyVisibleState = <ProductList
      onProductSelection={handleChangingSelectedProduct}
      productList={mainProductList}
    />;
  }

  return (
    <React.Fragment>
      {CurrentlyVisibleState}
      {<button onClick={handleClick} className="btn btn-primary">{buttonText}</button>}
    </React.Fragment>
  );

}

export default Control;
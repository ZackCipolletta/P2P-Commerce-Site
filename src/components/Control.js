import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc, query, orderBy } from "firebase/firestore";
import NewProductForm from "./NewProductForm";
import { Route, Routes, Outlet } from 'react-router-dom';
import EditProduct from "./EditProduct";
import ShoppingCart from "./ShoppingCart";
import ConfirmationPage from "./ConfirmationPage";
import UserAccount from "./UserAccount";

function Control(props) {

  const [mainProductList, setMainProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const { formVisibleOnPage, setFormVisibleOnPage, userCredentialInfo, cartVisible, setCartVisible, accountPageVisible, setAccountPageVisible } = props;

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
            shippingPrice: doc.data().shippingPrice,
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
      setFormVisibleOnPage(false);
      setSelectedProduct(null);
      setEditing(false);
      console.log("account page visible:");
      console.log(accountPageVisible);
    } else {
      setFormVisibleOnPage(false);
      setCartVisible(false);
      setConfirmationVisible(false);
      setAccountPageVisible(false);
    }
  };

  const handleChangingSelectedProduct = (id) => {
    const selection = mainProductList.filter(product => product.id === id)[0];
    if (cartVisible) {
      setCartVisible(false);
    }
    console.log("product id: " + id);
    console.log(selection.title);
    console.log(selection);
    setAccountPageVisible(false);
    setSelectedProduct(selection);
  };

  const handleAddingNewProductToList = async (newProductData) => {
    await addDoc(collection(db, "products"), newProductData);
    setFormVisibleOnPage(false);
  };

  const handleEditClick = () => {
    setEditing(true);
    console.log("setting edit to true");
  };

  const handleBuyClick = () => {
    setUserCart((prevUserCar) => [...userCart, selectedProduct]);
    console.log("item added to cart");
    console.log("the cart is now: " + userCart);
  };

  const removeFromCart = (id) => {
    setUserCart(userCart.filter((product) => product.id !== id));
  };

  const handleEditingProduct = async (productToEdit) => {
    const productRef = doc(db, "products", productToEdit.id);
    console.log("We've hit the handleEditing Product function");
    await updateDoc(productRef, productToEdit);
    setEditing(false);
    setSelectedProduct(null);
  };

  const handleUserAccountClick = () => {
    setAccountPageVisible(true);
    selectedProduct(null);
  };

  let CurrentlyVisibleState = null;
  let buttonText = null;
  if (editing) {
    CurrentlyVisibleState = <EditProduct
      userCredentialInfo={userCredentialInfo}
      onEditProduct={handleEditingProduct}
      productToEdit={selectedProduct} />;
    buttonText = "Return to list of products";
  } else if (cartVisible) {
    CurrentlyVisibleState = <ShoppingCart
      userCart={userCart}
      removeFromCart={removeFromCart}
      onProductSelection={handleChangingSelectedProduct}
      userCredentialInfo={userCredentialInfo} />;
    buttonText = "Return to list of products";
  } else if (accountPageVisible) {
    CurrentlyVisibleState = <UserAccount
      userCart={userCart}
      removeFromCart={removeFromCart}
      onProductSelection={handleChangingSelectedProduct}
      productList={mainProductList}
      userAccountClicked={handleUserAccountClick}
      userCredentialInfo={userCredentialInfo} />;
    buttonText = "Return to list of products";
  } else if (selectedProduct != null) {
    CurrentlyVisibleState = <ProductDetail
      userCredentialInfo={userCredentialInfo}
      productList={mainProductList}
      onClickingEdit={handleEditClick}
      onClickingBuy={handleBuyClick}
      product={selectedProduct} />;
    buttonText = "Return to list of products";
  } else if (formVisibleOnPage) {
    CurrentlyVisibleState = <NewProductForm
      setFormVisibleOnPage={setFormVisibleOnPage}
      onNewProductCreation={handleAddingNewProductToList}
      setConfirmationVisible={setConfirmationVisible}
      userCredentialInfo={userCredentialInfo} />;
    buttonText = "Return to list of products";
  } else if (confirmationVisible) {
    CurrentlyVisibleState = <ConfirmationPage
      setFormVisibleOnPage={setFormVisibleOnPage} />;
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
      {CurrentlyVisibleState.type !== ProductList ? (
        <button onClick={() => handleClick()} className="btn btn-primary">
          {buttonText}
        </button>
      ) : null}
      {CurrentlyVisibleState}
    </React.Fragment>
  );
};

export default Control;
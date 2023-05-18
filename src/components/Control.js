import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import NewProductForm from "./NewProductForm";
import EditProduct from "./EditProduct";
import ShoppingCart from "./ShoppingCart";
import ConfirmationPage from "./ConfirmationPage";
import UserAccount from "./UserAccount";
import Checkout from "./Checkout";
import PurchaseConfirmation from "./PurchaseConfirmation";

function Control(props) {

  const [mainProductList, setMainProductList] = useState([]);
  const [completedProductListings, setCompletedProductListings] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [confirmPurchase, setConfirmPurchase] = useState(false);


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


  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "InactiveProducts"),
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
            purchaser: doc.data().purchaser,
            shippingAddress: doc.data().shippingAddress,
            shipped: doc.data().shipped,
            id: doc.id
          });
        });
        setCompletedProductListings(products);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);


  const handleClick = () => {
    if (selectedProduct != null) {
      props.setFormVisibleOnPage(false);
      setSelectedProduct(null);
      setEditing(false);
      setCheckout(false);
      setConfirmPurchase(false)
    } else {
      props.setFormVisibleOnPage(false);
      props.setCartVisible(false);
      setConfirmationVisible(false);
      props.setAccountPageVisible(false);
      setConfirmPurchase(false)
    }
  };

  const handleChangingSelectedProduct = (id) => {
    const selection = mainProductList.filter(product => product.id === id)[0];
    if (props.cartVisible) {
      props.setCartVisible(false);
    }

    props.setAccountPageVisible(false);
    setSelectedProduct(selection);
  };

  const handleAddingNewProductToList = async (list, newProductData) => {
    await addDoc(collection(db, list), newProductData);
    props.setFormVisibleOnPage(false);
  };

  const handleDeletingProduct = async (id) => {
    if (!confirmPurchase) {
      setSelectedProduct(null);
    } 
    await deleteDoc(doc(db, "products", id));
    setSelectedProduct(null);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleBuyClick = () => {
    // Check if the selected product is already in the cart
    const isProductInCart = userCart.some((product) => product.id === selectedProduct.id);

    if (!isProductInCart) {
      // Add the selected product to the cart
      setUserCart((prevUserCart) => [...prevUserCart, selectedProduct]);
    } else {
      console.log("Product already in cart");
    }
  };

  //when a successful payment is made we need to update a few things
  const handlePaymentReceived = (id, cust, address) => {
    // first we remove the product from the user's cart and set checkout to false 
    // so they are no longer on the checkout page.
    removeFromCart(id);
    setCheckout(false);
    
    const product = mainProductList.find((product) => product.id === id);
    // Then we create a new variable named 'purchasedProduct' which is equal to the 
    // product the customer bought, with a few of the properties updated
    const purchasedProduct = {
      ...product,
      active: false,
      purchaser: cust,
      shipped: false,
      shippingAddress: address,
    };
    setConfirmPurchase(true);

    //then we add the purchasedProduct to a new list named 'InactiveProducts'
    handleAddingNewProductToList("InactiveProducts", purchasedProduct)
    // we delete the product the customer purchased from the main list of products
    handleDeletingProduct(id);
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
    props.setAccountPageVisible(true);
    selectedProduct(null);
  };

  const handleBuyNowClick = () => {
    setCheckout(true);
    props.setCartVisible(false);
  };

  let CurrentlyVisibleState = null;
  let buttonText = null;
  if (editing) {
    CurrentlyVisibleState = <EditProduct
      userCredentialInfo={props.userCredentialInfo}
      onEditProduct={handleEditingProduct}
      productToEdit={selectedProduct} />;
    buttonText = "Return to list of products";
  } else if (props.cartVisible) {
    CurrentlyVisibleState = <ShoppingCart
      userCart={userCart}
      removeFromCart={removeFromCart}
      buyNowClick={handleBuyNowClick}
      onProductSelection={handleChangingSelectedProduct}
      userCredentialInfo={props.userCredentialInfo} />;
    buttonText = "Return to list of products";
  } else if (checkout) {
    CurrentlyVisibleState = <Checkout
      userCredentialInfo={props.userCredentialInfo}
      product={selectedProduct}
      onPaymentReceived={handlePaymentReceived}
    />;
    buttonText = "Return to list of products";
  } else if (confirmPurchase) {
    CurrentlyVisibleState = <PurchaseConfirmation
      userCredentialInfo={props.userCredentialInfo}
      product={selectedProduct}
      onPaymentReceived={handlePaymentReceived}
    />;
    buttonText = "Return to list of products";
  } else if (props.accountPageVisible) {
    CurrentlyVisibleState = <UserAccount
      userCart={userCart}
      removeFromCart={removeFromCart}
      onProductSelection={handleChangingSelectedProduct}
      productList={mainProductList}
      completedProductListings={completedProductListings}
      userAccountClicked={handleUserAccountClick}
      userCredentialInfo={props.userCredentialInfo} />;
    buttonText = "Return to list of products";
  } else if (selectedProduct != null) {
    CurrentlyVisibleState = <ProductDetail
      userCredentialInfo={props.userCredentialInfo}
      productList={mainProductList}
      onClickingEdit={handleEditClick}
      onClickingBuy={handleBuyClick}
      product={selectedProduct} />;
    buttonText = "Return to list of products";
  } else if (props.formVisibleOnPage) {
    CurrentlyVisibleState = <NewProductForm
      setFormVisibleOnPage={props.setFormVisibleOnPage}
      onNewProductCreation={handleAddingNewProductToList}
      setConfirmationVisible={setConfirmationVisible}
      userCredentialInfo={props.userCredentialInfo} />;
    buttonText = "Return to list of products";
  } else if (confirmationVisible) {
    CurrentlyVisibleState = <ConfirmationPage
      setFormVisibleOnPage={props.setFormVisibleOnPage} />;
    buttonText = "Return to list of products";
  } else {
    CurrentlyVisibleState = <ProductList
      onProductSelection={handleChangingSelectedProduct}
      productList={mainProductList}
      userCredentialInfo={props.userCredentialInfo}
    />;

  }

  return (
    <React.Fragment>
      <div style={{ marginTop: "-10px", paddingTop: "-10px" }}>
        {CurrentlyVisibleState.type !== ProductList ? (
          <button onClick={() => handleClick()} className="btn btn-primary" style={{ marginTop: "-10px" }}>
            {buttonText}
          </button>
        ) : null}
      </div>
      {CurrentlyVisibleState}
    </React.Fragment>
  );
};

export default Control;
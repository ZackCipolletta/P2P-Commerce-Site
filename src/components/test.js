import React, { useState } from "react";
import ProductForm from "./ProductForm";

function NewProductForm(props) {
  const [imageUrl, setImageUrl] = useState(null);

  function handleImageUpload(downloadURL) {
    setImageUrl(downloadURL);
  }

  function handleNewProductCreation(
    title,
    description,
    condition,
    price,
    shippingPrice
  ) {
    const newProduct = {
      title: title,
      description: description,
      condition: condition,
      price: price,
      shippingPrice: shippingPrice,
      imageUrl: imageUrl,
    };
    props.onNewProductCreation(newProduct);
  }

  return (
    <div>
      <h2>Add a New Product</h2>
      <ProductForm
        onImageUpload={handleImageUpload}
        formSubmissionHandler={handleNewProductCreation}
      />
    </div>
  );
}

export default NewProductForm;

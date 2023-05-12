import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

function ProductForm(props) {
  const [imageUrl, setImageUrl] = useState(props.product?.imageUrl || null);

  // here we deconstruct the props passed down from NewProductForm. Names have been kept the same to make them easier to reason about.
  const { setImageUpload, formSubmissionHandler, product } = props;

  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [condition, setCondition] = useState(product?.condition || "");
  const [price, setPrice] = useState(product?.price || "");
  const [shippingPrice, setShippingPrice] = useState(product?.shippingPrice || "");

  function handleImageChange(event) {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setImageUpload(file);
  }

  return (
    <React.Fragment>
      <Box className="border p-4" textAlign="left">
        <form onSubmit={formSubmissionHandler} id="productForm" >
          <p>Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What are you selling?"
            />
          </p>
          <p>
            <span
              style={{ verticalAlign: 'top' }}>
              Description:
            </span>
            <textarea
              type="textarea"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your description here"
              style={{ width: "500px", height: "100px", resize: "both" }}
            />
          </p>
          <p>Upload image:
            <input type="file"
              id="file-input"
              name="image"
              onChange={handleImageChange}
            />
          </p>
          {imageUrl && <img src={imageUrl}
            alt="Preview"
            style



            const handleImageUpload = (imageUpload, setImageDownloadURL, setIsUploading) => {
              if (imageUpload == null) return;
              setIsUploading(true);
              const imageRef = ref(storage, `productImages/${imageUpload.name + v4()}`);
              uploadBytes(imageRef, imageUpload)
                .then((snapshot) =>
                  snapshot.metadata.fullPath)
                .then(() => getDownloadURL(imageRef)
                )
                .then((downloadURL) => {
                  alert("Image Uploaded");
                  console.log(downloadURL);
                  setImageDownloadURL(downloadURL);
                  setIsUploading(false);
                })
                .catch((error) => {
                  console.error(error);
                });
            };
            
            function NewProductForm(props) {
              const [imageUpload, setImageUpload] = useState(null);
              const [isUploading, setIsUploading] = useState(false);
              const [imageDownloadURL, setImageDownloadURL] = useState(null);
            
              const user = props.userCredentialInfo;
              const userEmail = user ? user.email : null;
            
              useEffect(() => {
                if (imageDownloadURL) {
                  handleSubmit();
                }
              }, [imageDownloadURL]);
            
              const handleSubmit = () => {
                if (imageDownloadURL === null) {
                  alert("Please upload an image.");
                  return;
                }
                setIsUploading(true);
                const form = document.getElementById('productForm');
                const formData = new FormData(form);
                console.log(formData.get("title"));
                console.log(props.userCredentialInfo);
                const productData = {
                  title: formData.get("title"),
                  description: formData.get("description"),
                  condition: formData.get("condition"),
                  price: parseFloat(parseFloat(formData.get("price")).toFixed(2)),
                  shippingPrice: parseFloat(parseFloat(formData.get("shippingPrice")).toFixed(2)),
                  imageUrl: imageDownloadURL,
                  user: userEmail
                };
                addDoc(collection(db, "products"), productData)
                  .then(() => {
                    alert("Product added!");
                    setIsUploading(false);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              };
            
              return (
                <React.Fragment>
                  <ProductForm
                    userCredentialInfo={props.userCredentialInfo}
                    formSubmissionHandler={() => handleImageUpload(imageUpload, setImageDownloadURL, setIsUploading)}
                    imageUpload={imageUpload}
                    setImageUpload={setImageUpload}
                    buttonText="Submit" />
                </React.Fragment>
              );
            }
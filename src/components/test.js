// const handleSubmit = (imageDownloadURL) => {
//     if (!imageDownloadURL) {
//       alert("Please upload an image.");
//       return;
//     }
//     setIsUploading(true);
//     const form = document.getElementById('productForm');
//     const formData = new FormData(form);
//     console.log(formData.get("title"));
//     console.log(props.userCredentialInfo);
//     const productData = {
//       title: formData.get("title"),
//       description: formData.get("description"),
//       condition: formData.get("condition"),
//       price: parseFloat(formData.get("price")),
//       shippingPrice: parseFloat(formData.get("shippingPrice")),
//       imageUrl: imageDownloadURL,
//       user: userEmail
//     };
//     addDoc(collection(db, "products"), productData)
//       .then(() => {
//         alert("Product added!");
//         setIsUploading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
// function ProductForm(props) {
//   const [imageUpload, setImageUpload] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [imageDownloadURL, setImageDownloadURL] = useState(null);

//   const user = props.userCredentialInfo;
//   const userEmail = user ? user.email : null;

//   const [title, setTitle] = useState(props.product ? props.product.title : "");
//   const [description, setDescription] = useState(
//     props.product ? props.product.description : ""
//   );
//   const [condition, setCondition] = useState(
//     props.product ? props.product.condition : "new"
//   );
//   const [price, setPrice] = useState(
//     props.product ? props.product.price.toString() : ""
//   );
//   const [shippingPrice, setShippingPrice] = useState(
//     props.product ? props.product.shippingPrice.toString() : ""
//   );

//   useEffect(() => {
//     if (imageDownloadURL) {
//       handleSubmit();
//     }
//   }, [imageDownloadURL]);

//   const handleImageUpload = (event) => {
//     event.preventDefault();
//     if (imageUpload == null) return;
//     setIsUploading(true);
//     const imageRef = ref(storage, `productImages/${imageUpload.name + v4()}`);
//     uploadBytes(imageRef, imageUpload)
//       .then((snapshot) => {
//         return snapshot.metadata.fullPath;
//       })
//       .then((path) => {
//         return getDownloadURL(imageRef);
//       })
//       .then((downloadURL) => {
//         alert("Image Uploaded");
//         console.log(downloadURL);
//         setImageDownloadURL(downloadURL);
//         setIsUploading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleSubmit = () => {
//     const newProduct = {
//       title: title,
//       description: description,
//       condition: condition,
//       price: parseFloat(price),
//       shippingPrice: parseFloat(shippingPrice),
//       imageUrl: imageUrl,
//       userEmail: userEmail,
//     };

//     if (props.product) {
//       props.updateProduct(props.product.id, newProduct);
//     } else {
//       props.addProduct(newProduct);
//     }

//     setTitle("");
//     setDescription("");
//     setCondition("new");
//     setPrice("");
//     setShippingPrice("");
//     setImageUrl(null);
//     setImageDownloadURL(null);
//   };

//   return (
//     <form className="product-form" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           className="form-control"
//           id="title"
//           required
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="description">Description</label>
//         <textarea
//           className="form-control"
//           id="description"
//           required
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         ></textarea>
//       </div>
//       <div className="form-group">
//         <label htmlFor="condition">Condition</label>
//         <select
//           className="form-control"
//           id="condition"
//           value={condition}
//           onChange={(e) => setCondition(e.target.value)}
//         >
//           <option value="new">New</option>
//           <option value="like_new">Like New</option>
//           <option value="used">Used</option>
//           <option value="fair">Fair</option>
//         </select>
//       </div>
//       <div className="form-group">
//         <label htmlFor="price">Price</label>
//         <input
//           type="number"
//           className="form-control"
//           id="price"
//           required
//           step=".01"
//           min="0"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="shippingPrice">Shipping Price</label>
//         <input
//           type="number"
//           className="form-control"
//           id="shippingPrice"
//           required
//           step=".01"
//           min="0"
//           value={shippingPrice}
//           onChange={(e) => setShippingPrice(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="image">Image</label>
//         <input
//           type="file"
//           className="form-control-file"
//           id="image"
//           accept="image/*"
//           onChange={(e) => setImageUpload(e.target.files[0])}
//         />
//         {isUploading && <p>Uploading image...</p>}
//         {imageUrl && (
//           <div className="product-image-preview">
//             <img src={imageUrl} alt="product" />
//           </div>
//         )}
//       </div>
//       <button type="submit" className="btn btn-primary">
//         {props.product ? "Update Product" : "Add Product"}
//       </button>
//     </form>
//   );
// }

// export default ProductForm;
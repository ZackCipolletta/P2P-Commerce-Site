const handleEditingProduct = async (productToEdit) => {
  if (!productToEdit.imageDownloadURL) {
    productToEdit.imageUrl = productToEdit.imageUrl || '';
  }
  const productRef = doc(db, "products", productToEdit.id);
  console.log("We've hit the handleEditing Product function")
  await updateDoc(productRef, productToEdit);
  setEditing(false);
  setSelectedProduct(null);
};

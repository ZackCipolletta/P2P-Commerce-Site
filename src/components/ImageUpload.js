import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import React, { useState, useEffect } from "react";


export const handleImageUpload = (event, imageUpload, setImageDownloadURL, setIsUploading ) => {
  event.preventDefault();
  console.log("submit clicked1");
  if (imageUpload == null) return;
  console.log("submit clicked2");

  // can use the setIsUploading state to display a message while product/image is being uploaded to db
  setIsUploading(true);
  // we use v4() here to name the image in the db, because often times people will upload an image with the same name as another
  // given image. By using v4() we can create a new random name to avoid any issues.
  const imageRef = ref(storage, `productImages/${imageUpload.name + v4()}`);
  uploadBytes(imageRef, imageUpload)
    .then((snapshot) => snapshot.metadata.fullPath)
    .then(() => getDownloadURL(imageRef))
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


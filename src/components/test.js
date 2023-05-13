import { handleImageUpload } from './imageUploadModule';

function NewProductForm(props) {
  // ...
  return (
    <React.Fragment>
      <ProductForm
        userCredentialInfo={props.userCredentialInfo}
        formSubmissionHandler={(event) => handleImageUpload(event, imageUpload, setImageDownloadURL, setIsUploading)}
        imageUpload={imageUpload}
        setImageUpload={setImageUpload}
        buttonText="Submit" />
    </React.Fragment>
  );
}

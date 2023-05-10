import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Control from './Control';
import NewProductForm from './NewProductForm';

function App() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);

  function handleAddProduct() {
    setFormVisibleOnPage(true);
  }

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box textAlign='center' fontSize='xl'>
          <Header onAddProduct={handleAddProduct} />
          {formVisibleOnPage ? (
            <NewProductForm onNewProductCreation={setFormVisibleOnPage} />
          ) : null}
          <Control />
          <Routes>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </Box>
      </Router>
      <ColorModeSwitcher justifySelf='flex-end' />
    </ChakraProvider>
  );
}

export default App;



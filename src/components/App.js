import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Grid, theme, } from '@chakra-ui/react';
import SignIn from "./SignIn";
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Header from "./Header";
import Control from './Control';

function App() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);

  function handleAddProduct() {
    setFormVisibleOnPage(true);
    console.log(formVisibleOnPage)
  }

  // function resetFormOnPage() {
  //   setFormVisibleOnPage(false);
  // }

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box textAlign="center" fontSize="xl">
          <Header onAddProduct={handleAddProduct} />
          <Grid minH="100vh" minW="100vh" columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<Control
                  formVisibleOnPage={formVisibleOnPage}
                  // onResetForm={resetFormOnPage}
                  setFormVisibleOnPage={setFormVisibleOnPage}
                />} />
              </Routes>
            </VStack>
          </Grid>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;

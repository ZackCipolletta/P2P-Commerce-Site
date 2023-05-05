import React from 'react';
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, SimpleGrid } from '@chakra-ui/react';
import SignIn from "./SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Header from "./Header";
import ProductList from "./ProductList";


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          {/* <Route path="/sign-in" element={<SignUp />} /> */}
          
        </Routes>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" minW="100vh" columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <ProductList />
            </VStack>
          </Grid>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;

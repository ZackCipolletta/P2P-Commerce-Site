import React from 'react';
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, SimpleGrid } from '@chakra-ui/react';
import SignIn from "./SignIn";
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Header from "./Header";
import Control from './Control';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box textAlign="center" fontSize="xl">
          <Header />
          <Grid minH="100vh" minW="100vh" columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/" element={<Control />} />
              </Routes>
            </VStack>
          </Grid>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;

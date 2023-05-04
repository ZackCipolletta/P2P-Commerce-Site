import React from 'react';
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, SimpleGrid } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Header from "./Header";
import ProductList from "./ProductList";


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" minW="100vh"columns={{sm: 1, md: 2, lg: 3}} spacing={10}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Header />
            <ProductList />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;

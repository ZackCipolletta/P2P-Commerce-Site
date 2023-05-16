import React from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text,
  Divider, ButtonGroup, Button, Box
} from '@chakra-ui/react';


function Product(props) {

  return (

    < React.Fragment >
      <Card maxW='sm' onClick={() => props.whenProductClicked(props.id)}>
        <CardBody>
          <Box
            h="200px" // Set the desired height of the image container
            bgImage={`url(${props.imageUrl})`} // Set the image URL as the background
            bgSize="cover" // Zoom the image to cover the container
            bgPosition="center" // Center the image within the container
          />
          <Stack mt='2' spacing='3' textAlign="left">
            <Text>
              {props.title.length > 25
                ? `${props.title.substring(0, 25)}...`
                : props.title}
            </Text>
            <Text fontWeight={"bold"} color='blue.600' fontSize='2xl'>
              ${props.price}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </React.Fragment >
  );
}

Product.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  condition: PropTypes.string,
  price: PropTypes.number,
  seller: PropTypes.string,
  imageUrl: PropTypes.string
};

export default Product;
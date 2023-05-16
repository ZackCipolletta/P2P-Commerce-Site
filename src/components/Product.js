import React from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text,
  Divider, ButtonGroup, Button
} from '@chakra-ui/react';


function Product(props) {

  return (

    < React.Fragment >
      <Card maxW='sm' onClick={() => props.whenProductClicked(props.id)}>
        <CardBody>
          <Image src={props.imageUrl} alt={props.title} objectFit="contain" maxHeight="200px" mx="auto"/>
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{props.title}</Heading>
            <Text color='blue.600' fontSize='2xl'>
              {props.price}
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
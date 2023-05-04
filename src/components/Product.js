import React from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Card, CardHeader, CardBody, CardFooter, Image, Stack,
  Heading, Text, Divider, ButtonGroup, Button
} from '@chakra-ui/react';


function Product(props) {

  return (
    <React.Fragment>
      <Card maxW='sm'>
        <CardBody>
          {props.image}
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{props.title}</Heading>
            <Text>
              {props.description}
            </Text>
            <Text color='blue.600' fontSize='2xl'>
              {props.price}
            </Text>
            <Text>Sold by: {props.seller}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              Buy now
            </Button>
            <Button variant='ghost' colorScheme='blue'>
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
}

Product.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  condition: PropTypes.string,
  price: PropTypes.number,
  seller: PropTypes.string,
  image: PropTypes.string
};

export default Product;
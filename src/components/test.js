{!props.product.active && props.product.user === userEmail && (
  <Box position="relative">
    <Button
      onClick={handleMarkAsShipped}
      display={isShipped ? "none" : "block"}
    >
      Mark Shipped
    </Button>
    {isShipped && (
      <Text
        position="absolute"
        top="0"
        left="0"
        width="100%"
        textAlign="center"
        fontWeight="bold"
        color="green"
      >
        Shipped
      </Text>
    )}
    <Text fontWeight="bold" mt={4}>
      Shipping Address:
    </Text>
    <Text>{props.product.shippingAddress.firstName}</Text>
    <Text>{props.product.shippingAddress.lastName}</Text>
    <Text>{props.product.shippingAddress.address}</Text>
    <Text>{props.product.shippingAddress.city}</Text>
    <Text>{props.product.shippingAddress.state}</Text>
    <Text>{props.product.shippingAddress.country}</Text>
  </Box>
);
}

const [isShipped, setIsShipped] = useState(false);

const handleMarkAsShipped = () => {
  props.markAsShipped(props.product)
  setIsShipped(true);
};


{(!props.product.active && props.product.user === userEmail) && (
  <React.Fragment>
    {props.product.shipped ? (
      <Text>Shipped</Text>
    ) : (
      <Button onClick={() => props.markAsShipped(props.product)}>Mark shipped</Button>
    )}
    <Text fontWeight="bold" mt={4}>
      Shipping Address:
    </Text>
    <Text>{props.product.shippingAddress.firstName}</Text>
    <Text>{props.product.shippingAddress.lastName}</Text>
    <Text>{props.product.shippingAddress.address}</Text>
    <Text>{props.product.shippingAddress.city}</Text>
    <Text>{props.product.shippingAddress.state}</Text>
    <Text>{props.product.shippingAddress.country}</Text>
  </React.Fragment>
);
}

{!props.product.active && props.product.user === userEmail && (
  <Box position="relative">
    <Button
      onClick={handleMarkAsShipped}
      display={isShipped ? "none" : "block"}
    >
      Mark Shipped
    </Button>
    {isShipped && (
      <Text
        position="absolute"
        top="0"
        left="0"
        width="100%"
        textAlign="center"
        fontWeight="bold"
        color="green"
      >
        Shipped
      </Text>
    )}
    <Text fontWeight="bold" mt={4}>
      Shipping Address:
    </Text>
    <Text>{props.product.shippingAddress.firstName}</Text>
    <Text>{props.product.shippingAddress.lastName}</Text>
    <Text>{props.product.shippingAddress.address}</Text>
    <Text>{props.product.shippingAddress.city}</Text>
    <Text>{props.product.shippingAddress.state}</Text>
    <Text>{props.product.shippingAddress.country}</Text>
  </Box>
)}

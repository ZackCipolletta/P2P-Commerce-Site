<React.Fragment>
  {/* If we want to utilize an X here to close out of the details page we will need ot find a way
  to do so which will conditionally send us back to either the user account page, cart page, or the main list
  depending on where we came from.
   <Text mb={-5} pb={-5} >X</Text>  */}
  <Box border="1px solid gray" p={4} w="850px" h="600px" mx="auto">
    <Grid templateColumns="repeat(2, 1fr)" gap={4} h="100%">

      <Box>
        <img
          src={props.product.imageUrl}
          alt="product"
          style={{
            maxWidth: "400px",
            minWidth: "250px",
            maxHeight: "400px",
            minHeight: "250px",
            margin: "auto",
            display: "block",
            width: "auto",
            height: "auto"
          }}
        />
      </Box>
      <Box mt={4} pt={4}>
        <Text fontWeight="bold" textAlign="left" mb={2}>
          {props.product.title}
        </Text>
        <Box
          textAlign="left"
          mb={2}
          maxHeight="150px" // Set the maximum height for the description box
          overflowY="auto" // Enable vertical scrolling if content overflows
        >
          <Text>
            Description: {props.product.description}
          </Text>
        </Box>
        <Text textAlign="left" mb={5} pb={5}>
          Price: ${props.product.price}
        </Text>

        {/* Rest of the code */}
      </Box>
      {/* Rest of the code */}
    </Grid>
    {/* Rest of the code */}
  </Box>
</React.Fragment>

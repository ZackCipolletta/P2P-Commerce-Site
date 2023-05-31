import React, { useState } from "react";
import {
  Select, Checkbox, Button, FormControl, FormLabel,
  Input, VStack, Heading, Text, SimpleGrid, GridItem, useBreakpointValue,
} from "@chakra-ui/react";

const UserDetails = ({ onShippingAddressChange }) => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onShippingAddressChange(formData);
  };

  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl">Your Details</Heading>
        <Text>If you already have an account, click here to log in.</Text>
      </VStack>
      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                placeholder="Kanye"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                placeholder="Kardashian"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                placeholder="123 Fake Street"
                value={formData.address}
                onChange={handleInputChange}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                name="city"
                placeholder="Santa Rosa"
                value={formData.city}
                onChange={handleInputChange}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>State</FormLabel>
              <Input
                name="state"
                placeholder="California"
                value={formData.state}
                onChange={handleInputChange}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="usa">United States of America</option>
                <option value="ca">Canada</option>
                <option value="ja">Japan</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
          </GridItem>
          <GridItem colSpan={2}>
            <Button type="submit" mt="10px">
              Save
            </Button>
          </GridItem>
        </SimpleGrid>
      </form>
    </VStack>
  );
};

export default UserDetails;
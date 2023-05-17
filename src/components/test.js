import { Select, Checkbox, Button, FormControl, FormLabel, Input, VStack, Heading, Text, SimpleGrid, GridItem, useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";

const UserDetails = ({ onShippingAddressChange }) => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const [formData, setFormData] = useState(new FormData());

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onShippingAddressChange(formData);
  };

  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl">Shipping Address</Heading>
      </VStack>
      <form onSubmit={handleFormSubmit}>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                placeholder="Kanye"
                onChange={(e) => formData.set("firstName", e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                placeholder="Kardashian"
                onChange={(e) => formData.set("lastName", e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                placeholder="123 Fake Street"
                onChange={(e) => formData.set("address", e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                name="city"
                placeholder="Santa Rosa"
                onChange={(e) => formData.set("city", e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>State</FormLabel>
              <Input
                name="state"
                placeholder="California"
                onChange={(e) => formData.set("state", e.target.value)}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select
                name="country"
                defaultValue="usa"
                onChange={(e) => formData.set("country", e.target.value)}
              >
                <option value="usa">United States of America</option>
                <option value="ca">Canada</option>
                <option value="ja">Japan</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Checkbox defaultChecked>Ship to Billing Address</Checkbox>
          </GridItem>
        </SimpleGrid>
        <Button type="submit">Submit</Button>
      </form>
    </VStack>
  );
};

export default UserDetails

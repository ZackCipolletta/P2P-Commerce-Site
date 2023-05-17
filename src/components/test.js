import { Select, Checkbox, Button, FormControl, FormLabel, Input, VStack, Heading, Text, SimpleGrid, GridItem, useBreakpointValue } from "@chakra-ui/react";

const Details = () => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  return (
    <VStack
      w="full"
      h="full"
      p={10}
      spacing={10}
      alignItems="flex-start"
    >
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl">Your Details</Heading>
        <Text>If you already have an account, click here to log in.</Text>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input placeholder="Kanye" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input placeholder="Kardashian" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input placeholder="123 Fake Street" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>City</FormLabel>
            <Input placeholder="Santa Rosa" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Select>
              <option value="usa">United States of America</option>
              <option value="ca">Canada</option>
              <option value="ja">Japan</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Checkbox defaultChecked>Ship to Billing Address</Checkbox>
        </GridItem>
        <GridItem colSpan={2}>
          <Button variant="primary" size="lg" w="full">Place Order</Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
};

export default Details;


#zoid-paypal-buttons-uid_b782883e94_mtc6mta6ndq {
  position: relative;
  display: inline-block;
  width: 100%;
  min-height: 35px;
  min-width: 200px;
  max-width: 750px;
  font-size: 0;
}

#zoid-paypal-buttons-uid_b782883e94_mtc6mta6ndq > iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#zoid-paypal-buttons-uid_b782883e94_mtc6mta6ndq > iframe.component-frame {
  z-index: 100;
}

#zoid-paypal-buttons-uid_b782883e94_mtc6mta6ndq > iframe.prerender-frame {
  transition: opacity .2s linear;
  z-index: 200;
}

#zoid-paypal-buttons-uid_b782883e94_mtc6mta6ndq > iframe.visible {
  opacity: 1;
}

#zoid-paypal-buttons-uid_b782883e94_mtc6mta6ndq > iframe.invisible {
  opacity: 0;
  pointer-events: none;
}

#zoid-paypal-buttons-uid_b782883e94_mtc6mta6ndq > .smart-menu {
  position: absolute;
  z-index: 300;
  top: 0;
  left: 0;
  width: 100%;
}

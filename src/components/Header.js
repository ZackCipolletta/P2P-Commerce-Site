import {
  Box, Flex, Text, IconButton, Button, Stack, Collapse, Icon, Link, Popover, useColorMode,
  PopoverTrigger, PopoverContent, useColorModeValue, useBreakpointValue, useDisclosure
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon, } from '@chakra-ui/icons';

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const colorModeValue = useColorModeValue('white', 'gray.800');
  const textColorModeValue = useColorModeValue('gray.600', 'white');
  const borderColorModeValue = useColorModeValue('gray.200', 'gray.900');
  const hoverColorModeValue = useColorModeValue('gray.800', 'white');
  const hoverTextColorModeValue = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box>
      <Flex
        bg={colorModeValue}
        color={textColorModeValue}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={borderColorModeValue}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={textColorModeValue}
          >
            <Link href={'/'}>Logo</Link>
          </Text>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <Stack direction={'row'} spacing={4}>
              {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                  <Link
                    p={2}
                    href={navItem.href ?? '#'}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={textColorModeValue}
                    _hover={{
                      textDecoration: 'none',
                      color: hoverColorModeValue,
                    }}
                  >
                    {navItem.label}
                  </Link>
                </Box>
              ))}
            </Stack>
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6} >
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'/sign-in'}>
            Sign In
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'/sign-up'}
            _hover={{
              bg: 'pink.300',
            }}>
            Sign Up
          </Button>
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const hoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box>
        <Flex
          py={2}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            as={href ? Link : 'div'}
            href={href ?? '#'}
            fontWeight={600}
            color={linkColor}
            onClick={href ? undefined : onToggle}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
      </Box>
    </Stack>
  );
};

const NAV_ITEMS = [{
  label: 'Category1', href: '#',
}, { label: 'Category2', href: '#', }, { label: 'Category3', href: '#', }, { label: 'Category4', href: '#', }];
import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  useMediaQuery,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWideEnough] = useMediaQuery("(min-width: 766px)");

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} mb={2}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={toggle}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box as="a" href="/">
              <Logo />
            </Box>
            <Box>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input type="text" placeholder="Search..." />
              </InputGroup>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Box
                as="a"
                px={2}
                py={1}
                p={2}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "#319795",
                  color: "white",
                }}
                href={"#"}
                color="#319795"
                fontWeight="bold"
                fontSize="md"
              >
                HOME
              </Box>
              <Box
                as="a"
                px={2}
                py={1}
                p={2}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: "#319795",
                  color: "white",
                }}
                href={"#"}
                color="#319795"
                fontWeight="bold"
                fontSize="md"
              >
                MY RECIPETIN
              </Box>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {isWideEnough && (
              <Flex>
                <Link to="/login-signup">
                  <Button variant={"solid"} colorScheme={"teal"} mr={4}>
                    LogIn
                  </Button>
                </Link>
                <Link to="/login-signup">
                  <Button variant={"solid"} colorScheme={"teal"} mr={4}>
                    SignUp
                  </Button>
                </Link>
              </Flex>
            )}
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  cursor="pointer"
                >
                  <path
                    fill="#F58332"
                    d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17z"
                  />
                </svg>
              </MenuButton>
              <MenuList>
                <MenuItem>Veg</MenuItem>
                <MenuItem>Non-Veg</MenuItem>
                <MenuDivider />
                <MenuItem>Veg & Non-Veg</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"/"}
              >
                HOME
              </Box>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"#"}
              >
                MY RECIPETIN
              </Box>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"#"}
              >
                LogIn
              </Box>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"#"}
              >
                SignUp
              </Box>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;

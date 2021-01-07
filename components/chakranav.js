import { Flex } from "@chakra-ui/react";

const ChakraNav = () => {
  return (
    <Flex
      as="nav"
      pos="fixed"
      bgGradient="linear(to-r, gray.800, gray.300 )"
      h="100vh"
      w="17rem"
    >
      Chakra Nav
    </Flex>
  );
};

export default ChakraNav;

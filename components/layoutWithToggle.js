import {
  Flex,
  Text,
  Box,
  Icon,
  Stack,
  Divider,
  Heading,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { IoBarbell } from "react-icons/io5";
import { GrPlan, GrHistory, GrLogout, GrHome } from "react-icons/gr";
import Image from "next/image";
import { useState } from "react";

const MenuItem = ({ children, href, icon, ...rest }) => {
  return (
    <Link href={href}>
      <a>
        <Stack
          // p={5}
          // borderRadius={32}
          align="center"
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 2, md: 4 }}
          {...rest}
        >
          <Icon as={icon} />
          <Text
            fontSize={{ base: "md", md: "2xl" }}
            fontWeight="medium"
            w="full"
            _hover={{ color: "#FFDD00" }}
          >
            {children}
          </Text>
        </Stack>
      </a>
    </Link>
  );
};

export default function Layout({ user, children }) {
  const [isVisible, setIsVisible] = useState(true);

  if (user && isVisible) {
    return (
      <Box minH="100vh">
        <CloseIcon
          display={{ base: "none", md: "unset" }}
          zIndex={70}
          pos="fixed"
          left={1}
          top={1}
          boxSize="1rem"
          _hover={{ cursor: "pointer" }}
          onClick={() => setIsVisible(false)}
        />
        <Flex
          as="nav"
          pos="fixed"
          justify="space-around"
          align="center"
          direction={{ base: "row", md: "column" }}
          bottom={{ base: 0, md: null }}
          p={{ base: 4, md: 0 }}
          h={{ base: 20, md: "100vh" }}
          w={{ base: "full", md: "2xs" }}
          textAlign="center"
          bg="white"
          borderTop={{ base: "1px", md: null }}
          borderColor="gray.200"
          boxShadow={{ base: "dark-lg", md: "none" }}
          zIndex={60}
        >
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/logo.png" alt="logo" width="200px" height="65px" />
          </Box>
          <MenuItem href="/" icon={GrHome} mt={{ base: 0, md: 12 }}>
            Overview
          </MenuItem>
          <MenuItem href="/workouts" icon={GrPlan}>
            Workouts
          </MenuItem>
          {/* <MenuItem href="/exercises" icon={IoBarbell}>
              Exercises
            </MenuItem> */}
          <MenuItem href="/history" icon={GrHistory}>
            History
          </MenuItem>
          <Divider mb={12} display={{ base: "none", md: "block" }} />
          <MenuItem href="/api/logout" icon={GrLogout}>
            Logout
          </MenuItem>
        </Flex>

        <Box p={4} mb={{ base: 12, md: 0 }} ml={{ base: 0, md: 64 }} as="main">
          {children}
        </Box>
      </Box>
    );
  } else if (user && !isVisible) {
    return (
      <>
        <HamburgerIcon
          display={{ base: "none", md: "unset" }}
          boxSize="2rem"
          _hover={{ cursor: "pointer" }}
          onClick={() => setIsVisible(true)}
        />
        <Box p={4} mb={{ base: 0, md: 0 }} ml={{ base: 0, md: 0 }} as="main">
          {children}
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Flex p={6} pos="fixed" w="full" align="center">
          <Box>
            <Image src="/logo.png" alt="logo" width="200px" height="70px" />
          </Box>
          <Spacer />
          <Link href="/api/login">
            <a>
              <Button colorScheme="yellow" size="lg">
                Login/Sign Up
              </Button>
            </a>
          </Link>
        </Flex>
        {children}
      </>
    );
  }
}

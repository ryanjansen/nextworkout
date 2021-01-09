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
import Link from "next/link";
import { IoBarbell } from "react-icons/io5";
import { GrPlan, GrHistory, GrLogout, GrLogin } from "react-icons/gr";

const MenuItem = ({ children, href, selected, icon }) => {
  return (
    <Link href={href}>
      <a>
        <Stack
          // p={5}
          // borderRadius={32}
          align="center"
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 2, md: 4 }}
          mb={{ base: 0, md: 10 }}
        >
          <Icon as={icon} />
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="medium"
            w="full"
            _hover={{ color: "yellow.300" }}
          >
            {children}
          </Text>
        </Stack>
      </a>
    </Link>
  );
};

export default function Layout({ user, children }) {
  if (user) {
    return (
      <Box minH="100vh">
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
          borderTop={{ base: "1px solid gray", md: null }}
          zIndex={2}
        >
          <Text
            display={{ base: "none", md: "block" }}
            fontSize="3xl"
            fontWeight="bold"
            mb={8}
            mt={8}
            color="yellow.300"
          >
            <Link href="/">
              <a>Pumpshock</a>
            </Link>
          </Text>

          <>
            <Box mb={8} display={{ base: "none", md: "block" }}>
              <Text fontSize="xl" fontWeight="bold">
                Welcome, {user.nickname}
              </Text>
            </Box>
            <MenuItem href="/workouts" icon={GrPlan}>
              Workouts
            </MenuItem>
            <MenuItem href="/exercises" icon={IoBarbell}>
              Exercises
            </MenuItem>
            <MenuItem href="/history" icon={GrHistory}>
              History
            </MenuItem>
            <Divider mb={12} display={{ base: "none", md: "block" }} />
            <MenuItem href="/api/logout" icon={GrLogout}>
              Logout
            </MenuItem>
          </>
        </Flex>

        <Box p={4} mb={{ base: 12, md: 0 }} ml={{ base: 0, md: 64 }} as="main">
          {children}
        </Box>
      </Box>
    );
  } else {
    return (
      <>
        <Flex pt={10} pl={8} pr={8} bg="black">
          <Box>
            <Heading color="yellow.400">Pumpshock</Heading>
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

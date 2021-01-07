import { Flex, Text, Box, Link as CLink } from "@chakra-ui/react";
import Link from "next/link";

export default function Layout({ user, children }) {
  return (
    <Box bg="gray.400" minH="100vh">
      <Flex
        as="nav"
        bgGradient="linear(to-r, gray.700, gray.500 )"
        pos="fixed"
        align="center"
        direction={["row", "row", "column"]}
        bottom={[0, 0, null]}
        h={[12, 12, "100vh"]}
        w={["full", "full", "2xs"]}
        color="white"
        textAlign="center"
      >
        <Text fontSize="3xl" fontWeight="bold" mb={32} mt={4}>
          <Link href="/" passHref>
            <CLink w="full">Pumpshock</CLink>
          </Link>
        </Text>
        <Text
          fontSize="lg"
          pr={1}
          mb={6}
          borderLeft="3px solid transparent"
          w="full"
          _hover={{ borderLeft: "3px solid yellow", cursor: "pointer" }}
        >
          <Link href="/workouts">
            <a>Workouts</a>
          </Link>
        </Text>
        <Text
          fontSize="lg"
          pr={1}
          mb={6}
          borderLeft="3px solid transparent"
          w="full"
          _hover={{ borderLeft: "3px solid yellow", cursor: "pointer" }}
        >
          <Link href="/exercises">
            <a>Exercises</a>
          </Link>
        </Text>
        <Text
          fontSize="lg"
          pr={1}
          mb={6}
          borderLeft="3px solid transparent"
          w="full"
          _hover={{ borderLeft: "3px solid yellow", cursor: "pointer" }}
        >
          <Link href="/history">
            <a>History</a>
          </Link>
        </Text>
        <style jsx>{`
          a,
          Link {
            width: 100%;
          }
        `}</style>
      </Flex>
      <Box p={12} mb={[12, 12, 0]} ml={[0, 0, 64]} as="main">
        {children}
      </Box>
    </Box>
  );
}

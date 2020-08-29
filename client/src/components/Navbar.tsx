import React from "react";
import { Box, Link, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

type NavbarProps = {};

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
    // data is loading
    body = null;
  } else if (!data?.me) {
    // user not logged in

    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex alignItems={"center"}>
        <Box mr={4}>{data.me.username}</Box>
        <Button backgroundColor="white" color="tan" variant="solid">
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex p={4} ml={"auto "} bg="tan">
      <Box ml={"auto"} color="white">
        {fetching ? null : body}
      </Box>
    </Flex>
  );
};

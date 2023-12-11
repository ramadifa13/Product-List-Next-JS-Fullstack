import { HomeWrapperProps } from "@/types";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

function HomeWrapper({ headerLabel, children }: HomeWrapperProps) {
  return (
    <Box height="100vh">
      <Flex
        direction="column"
        height="10vh"
        bg="#323232"
        alignItems="center"
        justifyContent="center"
      >
        <Box fontSize="2xl" fontWeight="bold" textColor="white">
          {headerLabel}
        </Box>
      </Flex>
      <Box height="90vh" bg="body-tertiary">
        {children}
      </Box>
    </Box>
  );
}

export default HomeWrapper;

import { Box, Stack } from "@chakra-ui/react";
import React from "react";

function DataNotFound() {
  return (
    <Box h="65vh" borderWidth="2px" borderRadius="lg" p="4">
      <Stack direction="column" align="center" justify="center" h="100%">
        <Box fontSize="2xl" fontWeight="bolder" mb="4">
          DATA NOT FOUND
        </Box>
      </Stack>
    </Box>
  );
}

export default DataNotFound;

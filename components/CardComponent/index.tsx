/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import DataNotFound from "../NotFound/DataNotFound";
import { formatRupiah, truncateText } from "@/utils";
import { CardComponentProps, Product } from "@/types";

const CardComponent: React.FC<CardComponentProps> = ({
  products,
  onSearch,
  onAddProduct,
  onUpdate,
  onDelete,
  onDetail,
  onPageChange,
  pagination,
  btnRef,
  loading = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const generatePaginationButtons = () => {
    const { totalPages, currentPage } = pagination;
    const maxVisiblePages = 3;
    const buttons = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            key={i}
            colorScheme="pink"
            onClick={() => onPageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </Button>,
        );
      }
    } else {
      const pages = [];
      const leftEllipsis = currentPage > maxVisiblePages / 2 + 1;
      const rightEllipsis = currentPage < totalPages - maxVisiblePages / 2;

      if (leftEllipsis) {
        pages.push(1, null);
      }

      const startPage = leftEllipsis
        ? currentPage - Math.floor(maxVisiblePages / 2)
        : 1;
      const endPage = rightEllipsis
        ? currentPage + Math.floor(maxVisiblePages / 2)
        : totalPages;

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (rightEllipsis) {
        pages.push(null, totalPages);
      }

      for (const page of pages) {
        if (page === null) {
          buttons.push(
            <Button
              key={`ellipsis-${buttons.length}`}
              colorScheme="pink"
              disabled
            >
              ...
            </Button>,
          );
        } else {
          buttons.push(
            <Button
              key={page}
              colorScheme="pink"
              onClick={() => onPageChange(page)}
              isActive={page === currentPage}
            >
              {page}
            </Button>,
          );
        }
      }
    }

    return buttons;
  };

  return (
    <>
      <Box
        justifyContent="space-between"
        display={"flex"}
        flexDirection={"row"}
        p={4}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Skeleton isLoaded={!loading}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name"
              />
              <InputRightElement width={"auto"}>
                <Button
                  colorScheme="yellow"
                  onClick={() => onSearch(searchTerm)}
                >
                  Search
                </Button>
              </InputRightElement>
            </InputGroup>
          </Skeleton>
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
          <Skeleton isLoaded={!loading}>
            <Button colorScheme="green" onClick={onAddProduct} ref={btnRef}>
              Add Product
            </Button>
          </Skeleton>
        </Box>
      </Box>
      <Skeleton isLoaded={!loading}>
        {products.length > 0 ? (
          <SimpleGrid
            p={3}
            spacing={4}
            templateColumns="repeat(5, 1fr)"
            maxH={"68vh"}
            overflow={"auto"}
          >
            {products.map((product: Product) => (
              <Card key={product.id}>
                <CardBody>
                  <Image
                    src={product.foto}
                    alt={`Product Image for ${product.nama}`}
                    borderRadius="lg"
                    height="200px"
                    objectFit="cover"
                  />
                  <Stack mt="3">
                    <Heading size="sm">
                      {truncateText(product.nama)}
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                      >
                        <Box display={"flex"} flexDirection={"column"}>
                          <Text
                            fontSize="xs"
                            color={product.stok != 0 ? "green" : "red"}
                          >
                            {product.stok != 0
                              ? product.stok + " stock"
                              : "not available "}
                          </Text>
                        </Box>
                        <Box display={"flex"} flexDirection={"column"}>
                          <Text fontSize="xs">
                            {formatRupiah(product.harga)}
                          </Text>
                        </Box>
                      </Box>
                    </Heading>
                    <Text fontSize="sm">{truncateText(product.deskripsi)}</Text>
                    <Menu>
                      <MenuButton
                        position="static"
                        bottom={0}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                      >
                        Actions
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => onDetail(product)}>
                          <ViewIcon mr={2} /> Detail
                        </MenuItem>
                        <MenuItem onClick={() => onUpdate(product)}>
                          <EditIcon mr={2} /> Update
                        </MenuItem>
                        <MenuItem onClick={() => onDelete(product)}>
                          <DeleteIcon mr={2} /> Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <DataNotFound />
        )}
      </Skeleton>
      <VStack pt={4} h="10vh" justify="center">
        <Skeleton isLoaded={!loading}>
          <ButtonGroup>
            <Button
              colorScheme="pink"
              onClick={() => onPageChange("prev")}
              isDisabled={pagination.currentPage === 1}
            >
              Previous
            </Button>
            {generatePaginationButtons()}
            <Button
              colorScheme="pink"
              onClick={() => onPageChange("next")}
              isDisabled={
                pagination.currentPage === pagination.totalPages ||
                products.length <= 0
              }
            >
              Next
            </Button>
          </ButtonGroup>
        </Skeleton>
      </VStack>
    </>
  );
};

export default CardComponent;

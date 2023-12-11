import React, { useEffect, useRef, useState } from "react";
import CardComponent from "@/components/CardComponent";
import axios from "axios";
import FormProductPage from "./FormProductPage";
import { defaultListObject } from "@/constants";
import { Box, Spinner, useToast } from "@chakra-ui/react";
import DeleteAlert from "./DeleteAlert";
import { Product } from "@/types";
import DetailProductModal from "./DetailProductModal";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    totalProducts: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
  });
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product>(defaultListObject);
  const [filterTerm, setFilterTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const toast = useToast();

  const showDrawer = () => {
    setIsOpenDrawer(true);
  };

  const hideDrawer = () => {
    setIsOpenDrawer(false);
    fetchData();
    setSelectedProduct(defaultListObject);
  };

  const fetchData = async (page = 1, limit = 5, searchTerm = "") => {
    try {
      setIsLoading(true);

      let url = `/api/products?page=${page}&limit=${limit}`;

      if (searchTerm.trim() !== "") {
        url += `&filterName=${searchTerm}`;
      }

      const response = await axios.get(url);
      setProducts(response.data.data);
      setPagination({
        totalProducts: response.data.pagination.totalProducts,
        totalPages: response.data.pagination.totalPages,
        currentPage: response.data.pagination.currentPage,
        pageSize: response.data.pagination.pageSize,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setFilterTerm(searchTerm);
    fetchData(1, pagination.pageSize, searchTerm);
  };

  const handlePageChange = (page: number | "prev" | "next") => {
    let newPage = pagination.currentPage;

    if (page === "prev") {
      newPage -= 1;
    } else if (page === "next") {
      newPage += 1;
    } else {
      newPage = page;
    }

    fetchData(newPage, pagination.pageSize, filterTerm);
  };

  const handleAddProduct = () => {
    showDrawer();
  };

  const handleUpdate = (item: Product) => {
    showDrawer();
    setSelectedProduct(item);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (item: Product) => {
    try {
      setIsDeleteAlertOpen(true);
      setSelectedProduct(item);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDetail = (item: Product) => {
    setSelectedProduct(item);
    setIsModal(true);
  };
  return (
    <>
      {isLoading && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Spinner size="xl" />
        </Box>
      )}

      <CardComponent
        products={products}
        onSearch={handleSearch}
        onAddProduct={handleAddProduct}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onDetail={handleDetail}
        onPageChange={handlePageChange}
        pagination={pagination}
        btnRef={btnRef}
        loading={isLoading}
      />

      <FormProductPage
        data={selectedProduct}
        isClose={hideDrawer}
        isOpen={isOpenDrawer}
        btnRef={btnRef}
      />
      <DeleteAlert
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={btnRef}
        onClose={() => setIsDeleteAlertOpen(false)}
        onDelete={async () => {
          return await axios
            .delete(`/api/products/${selectedProduct.id}`)
            .then(() => {
              fetchData();
            });
        }}
      />
      <DetailProductModal
        isModal={isModal}
        onClose={() => setIsModal(false)}
        data={selectedProduct}
      />
    </>
  );
}

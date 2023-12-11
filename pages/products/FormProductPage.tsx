import React, { useEffect, useState } from "react";
import axios from "axios";
import DrawerComponent from "@/components/DrawerComponent";
import {
  Box,
  Button,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  Tooltip,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { getRandomString } from "@/utils";
import { FormProductPageProps, Supplier } from "@/types";
import { defaultData } from "@/constants";

const FormProductPage: React.FC<FormProductPageProps> = ({
  isOpen,
  isClose,
  btnRef,
  data,
}) => {
  const [dataForm, setDataForm] = useState(defaultData);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("/api/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong when fetching suppliers",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSuppliers();
      if (data.id) {
        setDataForm((prevData) => ({
          ...prevData,
          productName: data.nama || "",
          description: data.deskripsi || "",
          price: data.harga || 0,
          stock: data.stok || 0,
          selectedSupplier: data.suplier_id || null,
          showFileInput: false,
        }));
      } else {
        setDataForm((prevData) => ({
          ...prevData,
          productName: "",
          description: "",
          price: 0,
          stock: 0,
          file: null,
          showFileInput: false,
          selectedSupplier: null,
        }));
      }
    } else {
      setDataForm(defaultData);
    }
  }, [isOpen, data]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setDataForm((prevData) => ({ ...prevData, file: selectedFile || null }));
  };

  const toggleFileInput = () => {
    setDataForm((prevData) => ({
      ...prevData,
      showFileInput: !prevData.showFileInput,
    }));
    if (!dataForm.showFileInput) {
      setDataForm((prevData) => ({ ...prevData, file: null }));
    }
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      if (data.id) {
        if (
          !dataForm.productName ||
          !dataForm.price ||
          !dataForm.stock ||
          !dataForm.selectedSupplier ||
          (dataForm.showFileInput && !dataForm.file)
        ) {
          toast({
            title: "Error",
            description: "Please fill in all required fields.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }
        await axios.put(`/api/products/${data.id}`, {
          nama: dataForm.productName,
          deskripsi: dataForm.description,
          harga: dataForm.price,
          stok: dataForm.stock,
          suplier_id: dataForm.selectedSupplier,
        });
        if (dataForm.file) {
          const formData = new FormData();
          formData.append("file", dataForm.file);
          formData.append("idProduct", data.id.toString());
          await axios.post("/api/updateFile", formData);
        }
        toast({
          title: "Success",
          description: "Product updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      isClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSupplier = async () => {
    try {
      setIsLoading(true);
      const randomData = getRandomString(5);
      const resSupplier = await axios.post("/api/suppliers", {
        nama_suplier: randomData,
        alamat: `address ${randomData}`,
        email: `${randomData}@example.com`,
      });
      fetchSuppliers();
      setDataForm((prevData) => ({
        ...prevData,
        selectedSupplier: resSupplier.data.id_suplier,
      }));
      toast({
        title: "Success",
        description: "Supplier created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create supplier",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (data.id) {
        handleUpdate();
      } else {
        if (
          !dataForm.productName ||
          !dataForm.price ||
          !dataForm.stock ||
          !dataForm.selectedSupplier ||
          !dataForm.file
        ) {
          toast({
            title: "Error",
            description: "Please fill in all required fields.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }
        const resProduct = await axios.post("/api/products", {
          nama: dataForm.productName,
          deskripsi: dataForm.description,
          harga: dataForm.price,
          stok: dataForm.stock,
          suplier_id: dataForm.selectedSupplier,
        });

        if (dataForm.file) {
          const formData = new FormData();
          formData.append("file", dataForm.file);
          formData.append("idProduct", resProduct.data.id.toString());

          await axios.post("/api/upload", formData);
        }
        toast({
          title: "Success",
          description: "Product created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        isClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create/update product",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DrawerComponent
      btnRef={btnRef}
      footer={
        <Button
          type="submit"
          colorScheme="green"
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Submit
        </Button>
      }
      headerLabel="Form Product"
      isOpen={isOpen}
      onClose={isClose}
    >
      <VStack spacing={4}>
        <Box>
          <label>
            Product Name<span style={{ color: "red" }}>*</span>
            <Input
              type="text"
              value={dataForm.productName}
              onChange={(e) =>
                setDataForm((prevData) => ({
                  ...prevData,
                  productName: e.target.value,
                }))
              }
            />
          </label>
        </Box>
        <Box>
          <label>
            Price<span style={{ color: "red" }}>*</span>
            <NumberInput
              min={0}
              value={dataForm.price}
              onChange={(e) =>
                setDataForm((prevData) => ({
                  ...prevData,
                  price: parseInt(e),
                }))
              }
              defaultValue={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </label>
        </Box>
        <Box>
          <label>
            Stock<span style={{ color: "red" }}>*</span>
            <NumberInput
              min={0}
              value={dataForm.stock}
              onChange={(e) =>
                setDataForm((prevData) => ({
                  ...prevData,
                  stock: parseInt(e),
                }))
              }
              defaultValue={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </label>
        </Box>
        <Box width={"100%"}>
          <label>
            Supplier<span style={{ color: "red" }}>*</span>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Select
                  placeholder="Select supplier"
                  value={dataForm.selectedSupplier || ""}
                  onChange={(e) =>
                    setDataForm((prevData) => ({
                      ...prevData,
                      selectedSupplier: parseInt(e.target.value),
                    }))
                  }
                >
                  {suppliers.map((supplier) => (
                    <option
                      key={supplier.id_suplier}
                      value={supplier.id_suplier}
                    >
                      {supplier.nama_suplier}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Tooltip
                  label="Create Data Random"
                  fontSize="md"
                  placement="left-start"
                >
                  <Button onClick={handleCreateSupplier}>+</Button>
                </Tooltip>
              </Box>
            </Box>
          </label>
        </Box>
        <Box>
          <label>
            Description:
            <Textarea
              value={dataForm.description}
              onChange={(e) =>
                setDataForm((prevData) => ({
                  ...prevData,
                  description: e.target.value,
                }))
              }
            />
          </label>
        </Box>
        {data.id ? (
          <Box width={"100%"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <label>
                Image<span style={{ color: "red" }}>*</span>
              </label>
              {dataForm.showFileInput ? (
                <Input type="file" onChange={handleFileChange} />
              ) : (
                <Image
                  src={data.foto}
                  alt={`Product Image for ${data.nama}`}
                  borderRadius="lg"
                  height="50px"
                  objectFit="cover"
                />
              )}
            </Box>
            <Box
              display={"flex"}
              mt={2}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Button onClick={toggleFileInput}>
                {dataForm.showFileInput ? "Cancel" : "Change"}
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <label>
              Select Image<span style={{ color: "red" }}>*</span>
              <Input type="file" onChange={handleFileChange} />
            </label>
          </Box>
        )}
      </VStack>
    </DrawerComponent>
  );
};

export default FormProductPage;

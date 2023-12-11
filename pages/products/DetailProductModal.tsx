// DetailProductModal.tsx
import ModalComponent from "@/components/modalComponent/ModalComponent";
import { DetailProductProps } from "@/types";
import { formatRupiah } from "@/utils";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";

function DetailProductModal({ isModal, onClose, data }: DetailProductProps) {
  return (
    <ModalComponent
      isOpen={isModal}
      onClose={onClose}
      modalHeader={`Product Detail - ${data.nama}`}
      modalFooter={null}
    >
      <Tabs>
        <TabList>
          <Tab>Image</Tab>
          <Tab>Detail</Tab>
          <Tab>Supplier</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Image src={data.foto} alt={data.nama} />
          </TabPanel>
          <TabPanel>
            <Grid templateColumns="repeat(3, 1fr)" gap={2} mb="3">
              <GridItem>
                <Text color={"#7f7f7f"} fontSize={14}>
                  Nama
                </Text>
                <Text
                  color={"#1c1c84"}
                  fontSize={16}
                  fontWeight={"bolder"}
                  rounded={10}
                  borderWidth={2}
                  p={2}
                >
                  {data.nama}
                </Text>
              </GridItem>
              <GridItem>
                <Text color={"#7f7f7f"} fontSize={14}>
                  Harga
                </Text>
                <Text
                  color={"#1c1c84"}
                  fontSize={16}
                  fontWeight={"bolder"}
                  rounded={10}
                  borderWidth={2}
                  p={2}
                >
                  {formatRupiah(data.harga)}
                </Text>
              </GridItem>
              <GridItem>
                <Text color={"#7f7f7f"} fontSize={14}>
                  Stok
                </Text>
                <Text
                  color={"#1c1c84"}
                  fontSize={16}
                  fontWeight={"bolder"}
                  rounded={10}
                  borderWidth={2}
                  p={2}
                >
                  {data.stok}
                </Text>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(1, 1fr)">
              <GridItem>
                <Text color={"#7f7f7f"} fontSize={14}>
                  Deskripsi
                </Text>
                <Text
                  color={"#1c1c84"}
                  fontSize={16}
                  fontWeight={"bolder"}
                  rounded={10}
                  borderWidth={2}
                  p={2}
                >
                  {data.deskripsi || " - "}
                </Text>
              </GridItem>
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid templateColumns="repeat(2, 1fr)" gap={2} mb={4}>
              <GridItem>
                <Text color={"#7f7f7f"} fontSize={14}>
                  Nama
                </Text>
                <Text
                  color={"#1c1c84"}
                  fontSize={16}
                  fontWeight={"bolder"}
                  rounded={10}
                  borderWidth={2}
                  p={2}
                >
                  {data.Supplier.nama_suplier}
                </Text>
              </GridItem>
              <GridItem>
                <Text color={"#7f7f7f"} fontSize={14}>
                  Email
                </Text>
                <Text
                  color={"#1c1c84"}
                  fontSize={16}
                  fontWeight={"bolder"}
                  rounded={10}
                  borderWidth={2}
                  p={2}
                >
                  {data.Supplier.email}
                </Text>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(1, 1fr)">
              <GridItem>
                <Text color={"#7f7f7f"} fontSize={14}>
                  Alamat
                </Text>
                <Text
                  color={"#1c1c84"}
                  fontSize={16}
                  fontWeight={"bolder"}
                  rounded={10}
                  borderWidth={2}
                  p={2}
                >
                  {data.Supplier.alamat}
                </Text>
              </GridItem>
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box></Box>
    </ModalComponent>
  );
}

export default DetailProductModal;

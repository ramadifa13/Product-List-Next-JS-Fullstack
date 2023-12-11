import HomeWrapper from "@/components/HomeWrapper";
import ProductListPage from "./products/ProductListPage";
import { ChakraProvider } from "@chakra-ui/react";

export default function App() {
  return (
    <ChakraProvider>
      <HomeWrapper headerLabel={"Product List"}>
        <ProductListPage />
      </HomeWrapper>
    </ChakraProvider>
  );
}

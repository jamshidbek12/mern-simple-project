import { useProductStore } from "../store/product.js";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const toast = useToast();

  const handleCreate = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <Container maxW={"container.sm"} mt={5}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={8}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder={"Product Name"}
              name="name"
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              value={newProduct.name}
            />
            <Input
              placeholder={"Price"}
              name="price"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              value={newProduct.price}
            />
            <Input
              placeholder={"Image URL"}
              name="image"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              value={newProduct.image}
            />

            <Button colorScheme="blue" onClick={handleCreate} w={"full"}>
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;

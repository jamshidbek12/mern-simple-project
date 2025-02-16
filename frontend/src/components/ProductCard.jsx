import { useProductStore } from "../store/product.js";
import {
  Box,
  Button,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const ProductCard = (product) => {
  const [updatedProduct, setupdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  const handleDeleted = async (pid) => {
    const { success, message } = await deleteProduct(pid);

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
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);

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
        description: "Product updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      bg={bg}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        objectFit={"cover"}
        w={"full"}
        h={"48"}
      />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} mb={4} color={textColor}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<FaRegEdit />}
            onClick={onOpen}
            colorScheme="blue"
          />
          <IconButton
            icon={<RiDeleteBin6Line />}
            onClick={() => handleDeleted(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder={"Product Name"}
                name="name"
                value={updatedProduct.name}
                onChange={(e) => {
                  setupdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  });
                }}
              />
              <Input
                placeholder={"Price"}
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setupdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder={"Image URL"}
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setupdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
              t
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;

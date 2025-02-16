import ProductCard from "../components/ProductCard.jsx";
import { useProductStore } from "../store/product.js";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={30}
          textAlign="center"
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400,blue.500)"}
          bgClip={"text"}
        >
          Current Products
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontWeight={"bold"}
            textAlign={"center"}
            fontSize={"xl"}
            color={"gray.500"}
          >
            No products found 😓{""}
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a new product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;

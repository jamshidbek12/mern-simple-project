import {
  Container,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { FiSun } from "react-icons/fi";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { IoMoon } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          md: "row",
        }}
      >
        {/* Why is not working */}
        <Text
          bgGradient={"linear(to-r, cyan.400,blue.500)"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          align={"center"}
          fontSize={{ base: "22", md: "28" }}
          bgClip={"text"}
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} align={"center"}>
          <Link to="/create">
            <Button>
              <HiOutlineSquaresPlus fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <FiSun size={"20"} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Hide,
  useDisclosure,
  Container,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import ShowCom from "./ShowCom";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import loggedInUser from "../Middleware/loggedInUser";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [icon, setIcon] = useState(false);
  // const [credit, setCredit] = useState(3);
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("#2ac3fd", "#1a202c");
  const clr = useColorModeValue("#1a202c", "#2ac3fd");
  const token = localStorage.getItem("kinesis_token");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    loggedInUser(token)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.user,
        });
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <Container maxW="container.2xl" pos={"fixed"} zIndex={"4"} top={0} bg={bg}>
      <Flex
        px={{ base: "0", lg: "35px" }}
        py="15px"
        h={{ base: "55px", lg: "70px" }}
        maxW="container.xl"
        m="auto"
        align={"center"}
        justify="space-between"
        bg={bg}
      >
        <Link to="/">
          <Text fontSize={"32px"} fontWeight={"bold"} color={clr}>
            Kinesis.AI
          </Text>
        </Link>

        <Box w="50%" ml="5%">
          <Flex align={"center"} justify={"flex-end"}>
            <ShowCom dir={true} bg={bg} clr={clr} />
            <Flex>
              <Flex gap={4} mx={4} align={"center"}>
                {token ? (
                  <Text bg={clr} px={2} borderRadius={10} color={bg}>
                    {user ? "Credit" : null}:{user?.credit}
                  </Text>
                ) : null}
                <Icon
                  as={icon ? BsToggleOff : BsToggleOn}
                  color="white"
                  boxSize={{ base: 7, lg: 8 }}
                  onClick={() => {
                    setIcon(!icon);
                    toggleColorMode();
                  }}
                />
              </Flex>
              <Hide above="lg">
                <Box ref={btnRef} bg="black" onClick={onOpen}>
                  <HamburgerIcon boxSize={9} bg={bg} />
                </Box>
              </Hide>
            </Flex>
          </Flex>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="md"
          >
            <DrawerOverlay w="600px" />
            <DrawerContent>
              <DrawerCloseButton
                color={clr}
                bg={bg}
                boxShadow="none !important"
                size="lg"
              />

              <DrawerBody>
                <ShowCom dir={false} onClose={onClose} bg={bg} clr={clr} />
              </DrawerBody>

              <DrawerFooter>
                <Text>Powered by Kinesis.AI</Text>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
    </Container>
  );
}

export default Navbar;

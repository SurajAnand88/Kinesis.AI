import { useState } from "react";
import {
  Flex,
  Box,
  Show,
  Text,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import { useDispatch, useSelector } from "react-redux";

const ShowCom = ({ dir, onClose: onClose2, bg, clr }) => {
  const token = localStorage.getItem("kinesis_token") || null;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const open = useSelector((state) => state.onOpen);
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    localStorage.removeItem("kinesis_token");
    toast({
      title: `Logout Successfully`,
      description: `You have successfully logged out`,
      status: "success",
      position: "top",
      duration: 1500,
      isClosable: true,
    });
    dispatch({ type: "LOGOUT" });
    onClose2();
    onClose();
  };

  if (open) {
    onOpen();
    dispatch({
      type: "onClose",
    });
  }

  return (
    <Box w="80%" mt={dir ? "0" : "30px"}>
      <Show above={dir ? "lg" : "base"}>
        <Flex
          justify="space-around"
          direction={dir ? "row" : "column"}
          align={"center"}
        >
          <Link to="/">
            <Text
              mx="10px"
              href="#"
              color={clr}
              fontWeight="bold"
              _hover={{ color: clr }}
              fontSize={dir ? "16px" : "36px"}
              onClick={onClose2}
            >
              Home
            </Text>
          </Link>
          <Link to="/post">
            <Text
              mx="10px"
              href="#"
              color={clr}
              fontWeight="bold"
              _hover={{ color: clr }}
              fontSize={dir ? "16px" : "36px"}
              mt={dir ? "0" : "12px"}
              onClick={onClose2}
            >
              Create
            </Text>
          </Link>

          <Text
            mx="10px"
            href="#"
            color={clr}
            fontWeight="bolder"
            _hover={{ color: clr }}
            fontSize={dir ? "16px" : "36px"}
            mt={dir ? "0" : "12px"}
            onClick={() => {
              token ? logout() : onOpen();
            }}
          >
            {token ? "Logout" : "Login"}
          </Text>
        </Flex>
      </Show>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>{signUp ? "SignUP" : "Login"}</ModalHeader>
          <ModalCloseButton onClick={onClose2} bg={bg} color={clr} />
          <ModalBody>
            {signUp ? (
              <SignUp
                setSignUp={setSignUp}
                onClose={onClose}
                bg={bg}
                clr={clr}
                onClose2={onClose2}
              />
            ) : (
              <Login
                setSignUp={setSignUp}
                onClose={onClose}
                bg={bg}
                clr={clr}
                onClose2={onClose2}
              />
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ShowCom;

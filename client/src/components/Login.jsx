import { Flex, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { onSuccess, onError } from "../assets/onSuccess";
import loggedInUser from "../Middleware/loggedInUser";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Login = ({ setSignUp, onClose, bg, clr, onClose2 }) => {
  const [loginObj, setLoginObj] = useState({});
  console.log(loginObj);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchLogin = async (response) => {
    try {
      if ((response.email && response.password) || response.profileObj) {
        axios
          .post(
            "http://localhost:3000/login",
            response.profileObj ? response.profileObj : response
          )
          .then(({ data }) => {
            console.log(data);
            localStorage.setItem("kinesis_token", data.token);
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: data.user,
            });
            toast({
              title: `Success`,
              description: `${data.message}`,
              status: "success",
              position: "top",
              duration: 1500,
              isClosable: true,
            });
            navigate("/post");
            onClose();
            onClose2();
          })
          .catch(({ response }) => {
            toast({
              title: `Error: ${response.status}`,
              description: `Error Message: ${response.data}`,
              status: "error",
              position: "top",
              duration: 1500,
              isClosable: true,
            });
          });
      } else {
        toast({
          title: `Invalid Input`,
          description: `Please fill all required fields`,
          status: "warning",
          position: "top",
          duration: 1500,
          isClosable: true,
        });
      }
    } catch ({ response }) {
      console.log(response);
    }
  };

  return (
    <Flex gap={4} direction={"column"}>
      <Input
        type="text"
        name="email"
        placeholder="Email"
        onChange={(e) =>
          setLoginObj({ ...loginObj, [e.target.name]: e.target.value })
        }
      />
      <Input
        type="password"
        name="password"
        placeholder="password"
        onChange={(e) =>
          setLoginObj({ ...loginObj, [e.target.name]: e.target.value })
        }
      />
      <Button
        bg={bg}
        color={clr}
        _hover={{ bg: clr, color: bg }}
        type="submit"
        onClick={() => fetchLogin(loginObj)}
      >
        Login
      </Button>
      <Button
        bg={bg}
        color={clr}
        _hover={{ bg: clr, color: bg }}
        onClick={() => setSignUp(true)}
      >
        SignUp
      </Button>
      <GoogleLogin
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        buttonText="Google Login"
        onSuccess={fetchLogin}
        onFailure={onError}
        cookiePolicy={"single_host_origin"}
      />
    </Flex>
  );
};

export default Login;

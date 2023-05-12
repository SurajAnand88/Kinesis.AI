import React, { useState, useEffect } from "react";
import { Flex, Input, Button, useToast } from "@chakra-ui/react";
import { GoogleLogin } from "react-google-login";
import { onError, onSuccess } from "../assets/onSuccess";
import { gapi } from "gapi-script";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const SignUp = ({ setSignUp, onClose, bg, clr, onClose2 }) => {
  const [signUpObj, setSignUpObj] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const fetchSignUp = async (response) => {
    try {
      if (
        (response.email && response.password && response.username) ||
        response.profileObj
      ) {
        axios
          .post(
            `https://kinesis-server.vercel.app/${
              response.profileObj ? "login" : "register"
            }`,
            response.profileObj ? response.profileObj : response
          )
          .then(({ data }) => {
            console.log(data);
            if (data.token && data.user) {
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
            } else {
              toast({
                title: `Success`,
                description: `${data}`,
                status: "success",
                position: "top",
                duration: 1500,
                isClosable: true,
              });
              setSignUp(false);
            }
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
        name="username"
        placeholder="UserName"
        onChange={(e) =>
          setSignUpObj({ ...signUpObj, [e.target.name]: e.target.value })
        }
      />
      <Input
        type="text"
        name="email"
        placeholder="Email"
        onChange={(e) =>
          setSignUpObj({ ...signUpObj, [e.target.name]: e.target.value })
        }
      />
      <Input
        type="password"
        name="password"
        placeholder="password"
        onChange={(e) =>
          setSignUpObj({ ...signUpObj, [e.target.name]: e.target.value })
        }
      />

      <Button
        bg={bg}
        color={clr}
        _hover={{ bg: clr, color: bg }}
        type="submit"
        onClick={() => fetchSignUp(signUpObj)}
      >
        SignUp
      </Button>
      <Button
        bg={bg}
        color={clr}
        _hover={{ bg: clr, color: bg }}
        onClick={() => setSignUp(false)}
      >
        Login
      </Button>
      <GoogleLogin
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        buttonText="SignUp using Google"
        onSuccess={fetchSignUp}
        onFailure={onError}
        cookiePolicy={"single_host_origin"}
      />
    </Flex>
  );
};

export default SignUp;

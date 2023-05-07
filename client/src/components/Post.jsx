import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Image,
  Spinner,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { surpriseMePrompts } from "../assets/surprise";
import { useNavigate } from "react-router";
import loggedInUser from "../Middleware/loggedInUser";
import { useDispatch, useSelector } from "react-redux";

const Post = () => {
  const [formData, setFormData] = useState({
    name: "",
    surprise: "",
  });
  const bg = useColorModeValue("#2ac3fd", "#1a202c");
  const clr = useColorModeValue("#1a202c", "#2ac3fd");
  const token = localStorage.getItem("kinesis_token") || null;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const handleSuprise = () => {
    let ind = Math.floor(Math.random() * (50 - 0)) + 0;
    if (formData.surprise === surpriseMePrompts[ind]) {
      handleSuprise();
    } else {
      setFormData({ ...formData, surprise: surpriseMePrompts[ind] });
    }
  };

  const handleShare = () => {
    if (data && formData.name && formData.surprise) {
      fetch("https://kinesis-server.onrender.com/post", {
        method: "POST",
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          text: formData.surprise,
          photo: `data:image/png;base64,${data.photo}`,
        }),
      })
        .then((res) => res.json())
        .then(navigate("/"))
        .catch((err) => console.log(err));
    } else {
      toast({
        title: "Invalid Image",
        description: "Please generate the images first.",
        status: "warning",
        // variant: "top-accent",
        position: "top",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  // useEffect(() => {
  //   loggedInUser(token)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       dispatch({
  //         type: "LOGIN_SUCCESS",
  //         payload: res.user,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const fetcher = () => {
    if (formData.name && formData.surprise && user.credit > 0) {
      return fetch("https://kinesis-server.onrender.com/api/v1/pearlai", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: formData.surprise }),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    } else if (user.credit === 0) {
      toast({
        title: "Invalid Credit",
        description: "Not Enough Credit to Generate Image.",
        status: "warning",
        // variant: "top-accent",
        position: "top",
        duration: 1500,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid Input",
        description: "Please fill all the required field.",
        status: "warning",
        // variant: "top-accent",
        position: "top",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const { isFetching, data, refetch } = useQuery("generate-image", fetcher, {
    enabled: false,
  });

  return (
    <Flex
      direction={"column"}
      p={4}
      gap={3}
      w={{ lg: "80%" }}
      m={"auto"}
      pt={"85px"}
    >
      <Text fontSize={"28px"} fontWeight={"bold"}>
        Create
      </Text>
      <Text
        fontSize={"16px"}
        fontWeight={"semibold"}
        bg={bg}
        borderRadius={"10px"}
        p={3}
      >
        Create imaginative and visually stunning images through Kinesis.AI and
        share them with the community
      </Text>

      <Flex direction={"column"} gap={3} px={2}>
        <Text fontSize={"16px"} fontWeight={"semibold"}>
          Your Name
        </Text>
        <Input
          type="text"
          placeholder="Enter Your Name"
          name="name"
          // value={user ? user.username : null}
          size={"sm"}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />
      </Flex>

      <Flex direction={"column"} px={2}>
        <Flex gap={5} align={"center"} py={4}>
          <Text fontSize={"16px"} fontWeight={"semibold"}>
            Use Suggestions
          </Text>
          <Button colorScheme="red" size={"sm"} onClick={handleSuprise}>
            Suggest Me
          </Button>
        </Flex>
        <Input
          type="text"
          name="surprise"
          placeholder="Enter a plain text to generate image"
          size={"sm"}
          value={formData.surprise}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />
      </Flex>

      <Box
        pos={"relative"}
        w={"300px"}
        p={3}
        backgroundColor={"gray.200"}
        borderRadius={"10px"}
      >
        <Image
          src={
            data
              ? `data:image/png;base64,${data.photo}`
              : "https://dp.la/thumb/8b310b359b6fe6d07e7f3e8145dce25b"
          }
          alt="empty"
          mx={"auto"}
        />
        {isFetching ? (
          <>
            <Text
              w={"full"}
              backgroundColor={"blackAlpha.400"}
              h={"full"}
              pos={"absolute"}
              top={"0"}
              left={"0"}
              borderRadius={"10px"}
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="red.500"
                size="lg"
                pos={"absolute"}
                top={"43%"}
                left={"43%"}
              />
            </Text>
          </>
        ) : null}
      </Box>
      <Button colorScheme="green" onClick={refetch}>
        {isFetching ? "Generating..." : "Generate"}
      </Button>
      <Flex direction={"column"} gap={4}>
        <Text
          fontSize={"16px"}
          fontWeight={"semibold"}
          bg={bg}
          color={clr}
          borderRadius={"10px"}
          p={4}
        >
          Once you have created the image you want , you can share it with
          others in the community
        </Text>
        <Button colorScheme="yellow" onClick={handleShare}>
          Share to the Community
        </Button>
      </Flex>
    </Flex>
  );
};

export default Post;

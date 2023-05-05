import { Image, Text, Box, Flex, Center } from "@chakra-ui/react";
import React from "react";
import "./style.css";
import { DownloadIcon } from "@chakra-ui/icons";
import { SaveAs, saveAs } from "file-saver";
const SingleImage = ({ image }) => {
  const downloadImage = () => {
    saveAs(`${image.url}`, "image.png");
  };
  return (
    <Box
      pos={"relative"}
      overflow={"hidden"}
      className="img-head"
      borderRadius={"10px"}
      w="100%"
      h="100%"
    >
      <Image src={image.url} w="100%" h="100%" />

      <Box
        pos={"absolute"}
        top={-130}
        color={"white"}
        className="img-body"
        backgroundColor={"rgba(0,0,0,0.4)"}
        w={"100%"}
        p={3}
      >
        <Text fontSize={"14px"} noOfLines={[1, 2, 3]}>
          {image.Text ? image.Text : image.text}
        </Text>
        <Flex justify={"space-between"}>
          <Flex gap={2} align={"center"}>
            <Center
              backgroundColor={"green"}
              color={"white"}
              h={"30px"}
              w={"30px"}
              borderRadius={"50%"}
              alignContent={"center"}
              fontSize={"16px"}
            >
              <Text>{image.name[0]}</Text>
            </Center>
            <Text>{image.name}</Text>
          </Flex>
          <Box>
            <DownloadIcon onClick={downloadImage} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default SingleImage;

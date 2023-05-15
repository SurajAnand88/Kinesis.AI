import { Image, Text, Box, Flex, Center } from "@chakra-ui/react";
import React from "react";
import "./style.css";
import { DownloadIcon } from "@chakra-ui/icons";
import { SaveAs, saveAs } from "file-saver";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const SingleImage = ({ image }) => {
  const downloadImage = () => {
    saveAs(`${image.url}`, "image.png");
  };
  return (
    <Box
      pos={"relative"}
      overflow={"hidden"}
      className="img-head"
      w="100%"
      h="100%"
    >
      <LazyLoadImage
        src={image.url}
        effect="blur"
        width={"100%"}
        height={"100%"}
        style={{ borderRadius: "10px" }}
        placeholderSrc="https://cdn.wallpapersafari.com/72/87/vJ7GMT.jpg"
      />

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
              borderBottomRadius={"50%"}
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

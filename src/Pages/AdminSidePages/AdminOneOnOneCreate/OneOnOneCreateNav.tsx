import React from "react";
import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const OneOnOneCreateNav = ({NavText}:any) => {
  const navigate = useNavigate();
  const [isSmallerThan800] = useMediaQuery("(max-width: 600px)");

  return (
    <div>
      <Box
        position="fixed"
        h="auto"
        marginTop={isSmallerThan800?'3cm':"62px"}
        bg="whiteAlpha.900"
        w="100%"
        zIndex={1}
      >
        <Box boxShadow="sm">
          <Flex
            position={"relative"}
            w={"80%"}
            align="center"
            m="auto"
            h={"60px"}
            justifyContent={"space-between"}
            color={"gray.600"}
          >
            <Button
              borderRadius="10px"
              colorScheme="white"
              border={'2px'}
              borderColor={'black'}
              color={'black'}
              onClick={() => navigate("/admin/one-on-one-interviews")}
            >
              Back
            </Button>

            <Text fontWeight="bold" fontSize="medium">
              {" "}
             {NavText}{" "}
            </Text>

          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default OneOnOneCreateNav;

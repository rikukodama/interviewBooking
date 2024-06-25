import { EventTypesNavbarArray } from "../../../Assets/Assets";
import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";

const DashboardNavbar = () => {
  const [isSmallerThan1000] = useMediaQuery("(max-width: 600px)");
  const url = window.location.pathname;
  const segments = url.split("/");
  const route = segments[segments.length - 1];
  const navigate = useNavigate();




  return (
    <div>
      <Box
        position="fixed"
        h="auto"

        zIndex={10}
      

        // position="absolute"
        marginTop={isSmallerThan1000? '110px': "55px"}

        bg="whiteAlpha.900"
        w="100%"
        // border={'1px'}
      >
        <Box boxShadow="sm">
          <Flex>
            
            {/* <Flex
              justifyContent={["center", "center", "flex-start"]}
              align="center"
              w={["100%", "100%", "50%"]}
              mt={[2, 2, 0]}
              mb={[2, 2, 0]}
            >
              {EventTypesNavbarArray.map((el) => (
                <Box ml={["0px", "0px", "7px"]} key={el} className="li">
                  <NavLink  key={el} to={"/admin/" + el.toLowerCase()}>
                  <Text fontWeight="medium" margin={1}> {el.split("-").join(" ")} </Text>
                  </NavLink>
                </Box>
              ))}
            </Flex> */}

            <Flex
              // w={["95%", "95%",'50%', "80%"]}
              w={'100%'}
              align="center"
              mb={[2, 2, 0]}
              mt="7px"
              flexDirection={'row-reverse'}
            //  border={'1px'}
            >
              {route === "dashboard" ? (
                ""
              ) : (
                <Button
                  colorScheme="white"
                  color={'black'}
                  border={'2px'}
                  borderColor={'black'}
                  _hover={{ cursor: "pointer" }}
                  m={'10px'}
                  mr={'30px'}
                  fontSize={{ base: "11px", sm: "13px", md: "14px", lg: "16px" }}
                  p="10px"
                  w="80px"
                  h={["30px", "40px", "40px"]}
                  onClick={() => navigate("/admin/Interviews")}
                >
                  Back
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default DashboardNavbar;

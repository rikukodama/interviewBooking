import {
  Box,
  Flex,
  Image,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { masaiImage, QuesTymes } from "../../Assets/Assets";

const UserNavbar = ({ title, buttonName }: any) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const userType = userDetails?.user?.roles[0]?.name;
  const linkTo = userType === "ROLE_ADMIN" ? "/admin/dashboard" : "/dashboard";

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <Box
        position="fixed"
        h="auto"
        top="0"
        bg="whiteAlpha.900"
        w="100%"
        zIndex={1}
      >
        <Box boxShadow="sm">
          <Flex
            position={"relative"}
            w={"97%"}
            align="center"
            m="auto"
            h={"60px"}
            justifyContent={"space-between"}
            color={"gray.600"}
          >
            <Flex align="center" flex={"2"}>
              <Link to={linkTo}>
                {" "}
                <Image
                  h="50px"
                  w="100px"
                  objectFit="contain"
                  src={masaiImage}
                  alt="Masai logo"
                />
              </Link>
            </Flex>
            <Flex align={"center"} gap="15px">
              {title == "Upcoming Events" ? (
                <Link
                  to={
                    buttonName == "+ Book 1-1" ? "/dashboard/past-events" : "#"
                  }
                >
                  <Button
                    width={["60px", "80px", "100px"]}
                    height={"30px"}
                    fontSize={["10px", "13px", "15px"]}
                    backgroundColor={"rgb(37,54,235)"}
                    color={"white"}
                  >
                    Old Events
                  </Button>
                </Link>
              ) : (
                ""
              )}
              <Link
                to={
                  buttonName == "+ Book 1-1"
                    ? "/dashboard/book-one-on-One"
                    : buttonName == "Back"
                    ? "/dashboard"
                    : "#"
                }
              >
                <Button
                  width={["60px", "80px", "100px"]}
                  height={"30px"}
                  fontSize={["10px", "13px", "15px"]}
                  backgroundColor={"rgb(37,54,235)"}
                  color={"white"}
                >
                  {buttonName}
                </Button>
              </Link>
              <Popover placement="top" isLazy>
                <PopoverTrigger>
                  <Flex cursor="pointer">
                    <Text>{userDetails?.user?.name}</Text>
                    <i
                      style={{ marginLeft: "10px", marginTop: "4px" }}
                      className="fa-solid fa-caret-down"
                    ></i>
                  </Flex>
                </PopoverTrigger>
                <PopoverContent
                  style={{ zIndex: 10 }}
                  marginTop="0px"
                  marginRight="10px"
                >
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>{userDetails?.user?.name}</PopoverHeader>
                  <PopoverBody>
                    {/* Popover content */}
                    <Text cursor="pointer" onClick={Logout}>
                      Logout
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default UserNavbar;

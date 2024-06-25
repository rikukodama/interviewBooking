import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSearch } from "../../utils/SetParams";

const Header = ({ title, buttonName }: any) => {
  const [search, updateSearch] = useSearch();

  const handleResetParams = () => {
    Object.keys(search).forEach(function (key) {
      search[key] = "";
    });
    updateSearch(search);
  };

  return (
    <div>
      <header>
        <Box w="100%" bg={"white"}>
          <Box bg="white" h={"auto"} w="100%" mt={"62px"} position="fixed">
            <Box
              h={"60px"}
              m={"auto"}
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
              w="90%"
            >
              <Text
                fontSize={["17px", "19px", "22px"]}
                fontWeight={"500"}
                fontFamily={"sans-serif"}
              >
                {title}
              </Text>

              <Button
                type="submit"
                colorScheme="white"
                border={"2px"}
                borderColor={"black"}
                color={"black"}
                onClick={() => handleResetParams()}
              >
                RESET
              </Button>

              {/* {title=="Upcoming Events"? <Link to={buttonName=="+ Book 1-1"?"/dashboard/past-events":"#"}><Button colorScheme="blue">Old Events</Button></Link>:""}
                            <Link to={buttonName=="+ Book 1-1"?"/dashboard/book-one-on-One":buttonName=="Back"?"/dashboard":"#"}><Button colorScheme="blue">{buttonName}</Button></Link> */}
              {buttonName === "Back" && (
                <Link to={buttonName == "Back" ? "/dashboard" : "#"}>
                  <Button
                    colorScheme="white"
                    border={"2px"}
                    borderColor={"black"}
                    color={"black"}
                  >
                    {buttonName}
                  </Button>
                </Link>
              )}
            </Box>
          </Box>
        </Box>
      </header>
    </div>
  );
};

export default Header;

import Navbar from "../../../Components/Navbar/Navbar";
import React from "react";
import OneOnOneCreateNav from "../AdminOneOnOneCreate/OneOnOneCreateNav";
import { Box } from "@chakra-ui/react";
import OneOnOneSlots from "./EventDetails";

const SingleRecurringEventDetails = () => {
  return (
    <div className="container">
      <Navbar />
      <OneOnOneCreateNav NavText="Recurring EventDetails" />
<br/>
      <Box
        w="80%"
        ml="10%"
        mt="130px"
        minH="200px"
        h="auto"
        p="2%"
        bg="white"
        borderRadius="10px"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <OneOnOneSlots />
      </Box>
    </div>
  );
};

export default SingleRecurringEventDetails;

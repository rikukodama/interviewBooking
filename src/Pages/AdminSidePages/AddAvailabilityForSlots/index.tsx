import React from "react";
import OneOnOneSlots from "../../../Components/AddAvailabilityToOneOnOne/OneOnOneSlots";
import { Box,  } from "@chakra-ui/react";
import OneOnOneCreateNav from "../AdminOneOnOneCreate/OneOnOneCreateNav";
import Navbar from "../../../Components/Navbar/Navbar";

const AddDaysAvailability = () => {


  return (
    <div className="container">
      <Navbar />
      <OneOnOneCreateNav NavText="Add  Availability For One-On-One Event" />
      <br/>
      <Box
        w="80%"
        ml="10%"
        mt="130px"
        minH="200px"
        h="auto"
        p="5%"
        bg="white"
        borderRadius="10px"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
    
          <OneOnOneSlots
            
          />
        
       </Box>
    </div>
  );
};

export default AddDaysAvailability;

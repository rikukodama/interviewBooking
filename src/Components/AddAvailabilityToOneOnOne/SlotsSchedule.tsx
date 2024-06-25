import {
  Box,
    Divider,
  Flex,
  FormLabel,
  Select,
  
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import DayAvailability from "./DayAvailability";




//this component is for scheduling slots based on day and date
const SlotsSchedule = ({ days, setDays }: any) => {

  const isWide = useMediaQuery("(min-width: 600px)");

  return (
    <div>
      <Box w="100%" h="auto" border="1px solid grey">
        <Box w="90%" ml="5%" mt="10px" h="auto">
          <FormLabel mt="10px" ml="10px" color="rgb(75 85 99)">
            Time Zone
          </FormLabel>
          <Select ml="10px" w="23%" color="blue" variant="unstyled">
            <option value="">Indian Standard Time</option>
          </Select>
        </Box>

        <Divider mt="20px" />

        <Box h="auto" display={isWide[0] ? "flex" : "block"}>
          <Box w="100%" h="auto" borderRight="1px solid grey">
            <Box w="90%" ml="5%" mt="10px" h="auto">
              <FormLabel mt="10px" color="rgb(75 85 99)">
                Set your weekly hours
              </FormLabel>

              <Flex w="100%" p="20px" >
                <DayAvailability days={days} setDays={setDays} />
              </Flex>
            </Box>
          </Box>
        </Box>
       </Box> 
    </div>
  );
};

export default SlotsSchedule;

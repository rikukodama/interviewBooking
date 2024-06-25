import React, { useCallback, useEffect, useState } from "react";
import { Box, Flex, FormLabel, } from "@chakra-ui/react";
import SlotsSchedule from "../../../Components/AddAvailabilityToOneOnOne/SlotsSchedule";
import {
  DetailsRecurringEvent,
} from "../../../Services/AdminSideServices/GetEventsService";
import {   useParams } from "react-router-dom";
import {
  DaysForRecurring,

  token,
  id as adminId,
} from "../../../Assets/Assets";
import TableForRecurringDetails from "./TableForRecurringDetails";


const OneOnOneSlots = () => {
  const [days, setDays] = useState(DaysForRecurring);

  const [recurringEventDetails, setRecurringEventDetails] = useState({
    title: "",
    meetingLink: "",
    duration: "",
    category: "",
    adminId: adminId,
    recurringId: 0,
    instruction: "",
    availabilities: [] as {
      day: string;
      isChecked: boolean;
      startTime: string;
      endTime: string;
    }[],
  });

  const { id } = useParams();

  // when getting values from backend make it to frontend
  useEffect(() => {
    const transformedResponse = recurringEventDetails?.availabilities?.map(
      (day) => {
        return {
          name: day.day,
          isChecked: true,
          inputs: [{ start: day.startTime, end: day.endTime }],

          errors: [{ start: "", end: "" }],
        };
      }
    );
    console.log(transformedResponse,recurringEventDetails)

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const result = days.map((day) => {
      const foundDay = transformedResponse?.find((item) => item.name === day);
      if (foundDay) {
        return foundDay;
      } else {
        return {
          name: day,
          isChecked: false,
          inputs: [{ start: "", end: "" }],
          errors: [{ start: "", end: "" }],
        };
      }
    });
    setDays(result);
  }, [recurringEventDetails]);

  const GetDetails = useCallback(async () => {
    try {
      const response = await DetailsRecurringEvent(adminId, token);

      response.forEach((el: any) => {
        if (id && el.recurringId === parseInt(id)) {
          setRecurringEventDetails(el);
        }
      });
    } catch (error) {}
    
  }, [id]);

  useEffect(() => {
    GetDetails();
  }, [GetDetails]);



  return (
    <div>


<Box
  w="100%"
  mb="30px"
  minH="200px"
  h="auto"
  p={{ base: "5%", md: "2%" }} 
  bg="white"
  borderRadius="10px"
  boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
>
  <Box w={{ base: "100%", md: "80%" }} ml={{ base: "0", md: "10%" }}> 
    <TableForRecurringDetails recurringEventDetails={recurringEventDetails} />
  </Box>
</Box>

<Box
  w="100%"
  mb="30px"
  minH="200px"
  h="auto"
  p={{ base: "5%", md: "2%" }}
  bg="white"
  borderRadius="10px"
  boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
>
  <Flex justifyContent="center">
    <FormLabel ml={{ base: "0", md: "10px" }}>
      Availability Time for this Event Type
    </FormLabel>
  </Flex>
  <Box ml={{ base: "0", md: "10%" }} w={{ base: "100%", md: "80%" }}> 
    <SlotsSchedule days={days} setDays={setDays} />
  </Box>
</Box>

    </div>
  );
};

export default OneOnOneSlots;
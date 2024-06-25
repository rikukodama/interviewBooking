import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Text,
  useToast,
} from "@chakra-ui/react";
import SlotsSchedule from "./SlotsSchedule";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  AddRecurringSlotsService,
} from "../../Services/AdminSideServices/GetEventsService";
import { useNavigate } from "react-router-dom";
import { DaysForRecurring, backendResponse,token,id } from "../../Assets/Assets";

const OneOnOneSlots = () => {
  const [days, setDays] = useState(DaysForRecurring);
  const state = useSelector((state: RootState) => state);
  const setData = state.SingleEventReducer;
  
  const [availability, setAvailability] = useState<{ 
    day: string; 
    isChecked: boolean; 
    slotTiming: { 
      startTime: string; 
      endTime: string; 
    }[] 
  }[]>([]);

  const [recurringEventDetails, setRecurringEventDetails] = useState({
    title: setData?.setData?.title,
    meetingLink: setData?.setData?.meetingLink,
    duration: setData?.setData?.duration,
    category: setData?.setData?.category,
    adminId:id,
    instruction: setData?.setData?.instruction,
    availabilities: [] as {
      day: string; 
      isChecked: boolean; 
      slotTiming: { 
        startTime: string; 
        endTime: string; 
      }[] 
    }[]
  });
  const toast = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const transformedDays = days.map(day => {
      if (day.isChecked) {
        return {
          day: day.name,
          isChecked: day.isChecked,
          slotTiming: day.inputs.map(input => ({
            startTime: input.start,
            endTime: input.end
          }))
        };
      }
      return undefined;
    }).filter(day => day !== undefined) as {
      day: string; 
      isChecked: boolean; 
      slotTiming: { 
        startTime: string; 
        endTime: string; 
      }[] 
    }[];
  
    if (transformedDays.length > 0) {
      setAvailability(transformedDays);
      console.log(availability)
      setRecurringEventDetails({
        ...recurringEventDetails,
        availabilities: transformedDays
      });
    }
  }, [days,recurringEventDetails,availability]);
 
  
 
// when getting values from backend make it to frontend
useEffect(()=>{
  const transformedResponse = backendResponse.map((day) => {
    return {
     name: day.day,
      isChecked: true,
      inputs: day.slotTiming.map((timeSlot) => {
        return { start: timeSlot.startTime, end: timeSlot.endTime };
      }),
      errors: day.slotTiming.map((timeSlot) => {
        return { start: "", end: "" };
      }),
    };
  });


  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const result = days.map(day => {
const foundDay = transformedResponse.find(item => item.name === day);
if (foundDay) {
  return foundDay;
} else {
  return {
    name: day,
    isChecked: false,
    inputs: [{ start: '', end: '' }],
    errors: [{ start: '', end: '' }]
  };
}
});
setDays(result)
},[])

  const AddSlots = async () => {
    try {
      const response = await AddRecurringSlotsService(id, recurringEventDetails,token);
      if (response) {
        toast({
          title: "Slots Added Successfully",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/admin/one-on-one-interviews");
        }, 2000);
      }
    } catch (err) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  };



  return (
    <div>
      <Box h="auto" p="20px" mt="5px" border="1px solid grey">
        <Box
         
          h="auto"
          cursor="pointer"
          mt="5px"
        >
          <Flex  justifyContent="space-between">
            <Box>
              {" "}
              <Flex mt="10px">
                <i
                  style={{ marginTop: "4PX" }}
                  className="fa-regular fa-calendar-days"
                ></i>
                <FormLabel ml="10px" color="rgb(75 85 99)">
                  When can people book this event ?
                </FormLabel>
              </Flex>
              <Flex>
                {" "}
                <Text>{setData?.setData?.title}</Text>{" "}
                <Text ml="20px">{setData?.setData?.duration} Minutes</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Divider mt="20px" mb="20px" h="2px" />
        <FormLabel ml="10px" color="rgb(75 85 99)">
          {" "}
          Set availability time for this event type{" "}
        </FormLabel>

        <SlotsSchedule days={days} setDays={setDays} />

        <Divider mt="20px" mb="20px" h="2px" />
        <Flex justifyContent={"flex-end"}>
          <Box>
           
          
            <Button
              size={["sm", "md"]}
              borderRadius="16px"
              colorScheme="blue"
              onClick={AddSlots}
            >
              Add Slots
            </Button>
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default OneOnOneSlots;

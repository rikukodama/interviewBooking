import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";

import {
  DeleteSlotsService,
  GetDateOneOffService,
  GetSlotsForDateService,
} from "../../../Services/AdminSideServices/GetEventsService";
import {  ISlotsValues } from "../Interfacces";
import { useLocation, useNavigate } from "react-router-dom";
import OneOnOneCreateNav from "../AdminOneOnOneCreate/OneOnOneCreateNav";
import Navbar from "../../../Components/Navbar/Navbar";
import Calendar from "../../../Components/Calender/Calendar";
import { token,id} from "../../../Assets/Assets";

const OneOnOneSlotsView = () => {
  const [events, setEvents] = useState<ISlotsValues[]>([]);
  const [dates, setDates] = useState([]);
  const [selectedDay, setSelectedDay] = useState<string >("");
  const location = useLocation();
  const toast = useToast();
  const [isSmallerThan600] = useMediaQuery("(max-width: 800px)");
  const [isLoading,setIsLoading] = useState(true)
  const navigate = useNavigate()

  
  

//get events for date setting on calender
  const GetEvents = useCallback(async () => {
    try {
      const response = await GetDateOneOffService(id);
      if (response.dates) {
        setIsLoading(false)
        setDates(response.dates);
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
  }, [toast]);

  useEffect(() => {
    GetEvents();
  }, [GetEvents]);

  //getting slots informaion for particular date
  const GetEventByDate = useCallback(
    async (date: string) => {
      try {
        const response = await GetSlotsForDateService(id, date, token)

        if (response.length) {
          setIsLoading(false)
          setEvents(response);
        } else {
          setEvents([]);
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
    },
    [toast]
  );

  //Delete slot sevice
  const DeleteSlot =async(slotId:any)=>{
    try {
      const response = await DeleteSlotsService(slotId, token);

   if(response){
    GetEventByDate(selectedDay)
    toast({
      title: "Slot Deletion Successful",
      status: "success",
      position: "top",
      duration: 2000,
      isClosable: true,
    });
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
  }

  //when click on date it should add date to url and set event
  const handleSelect = (arg: { start: Date; end: Date; startStr: string }) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("date", arg.startStr);
    const newUrl = window.location.pathname + "?" + searchParams.toString();
    window.history.pushState({ path: newUrl }, "", newUrl);
    setSelectedDay(arg.startStr);
    GetEventByDate(arg.startStr);
   
  };

  //when component render set event based on date get by urlparams
  const setEventByDate = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const dateStr = searchParams.get("date");

    if (dateStr) {
      GetEventByDate(dateStr);
    }
  }, [location.search, GetEventByDate]);

  useEffect(() => {
    setEventByDate();
  }, [setEventByDate]);

  //for gettng current date slot on useEffect
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const now = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; // offset in milliseconds
const istTime = new Date(now.getTime() + istOffset);
const istDate = istTime.toISOString().slice(0, 10);
    searchParams.set("date",  istDate);
    const newUrl = window.location.pathname + "?" + searchParams.toString();
    window.history.pushState({ path: newUrl }, "", newUrl);
    GetEventByDate( istDate);
    setSelectedDay( istDate);
  }, [GetEventByDate]);



const GotoViewSlotDetails =(id:any,date:any)=>{
localStorage.setItem("slotDate",date)
      navigate(`/admin/slots/view/${id}`)
}



  return (
    <div className="container">
      <Navbar />
      <OneOnOneCreateNav NavText=" All  Available Slots" />
      <br/>
      <Box
        boxShadow="0 5px 15px rgba(0,0,0,0.06)"
        h="auto"
        m='auto'
        mt={isSmallerThan600?"170px":"130px"}
        bg="white"
        w="90%"
        p="2%"
        pb="100px"
      >
       <Stack direction={isSmallerThan600 ? "column" : "row"} spacing={8}>
       <Box
  boxShadow="0 5px 15px rgba(0,0,0,0.06)"
  w={{ base: "100%", sm: "100%", md: "60%" }}
  ml={{ base: "0", sm: "0", md: "20px" }}
  h="auto"
  p="20px"
>
            <Calendar
              events={events}
              handleSelect={handleSelect}
              dates={dates}
            />


          </Box>


          <Box
            boxShadow="0 5px 15px rgba(0,0,0,0.06)"
            h="auto"
            ml="20px"
            bg="white"
            w={{ base: "100%", sm: "100%", md: "40%" }}
            p="20px"
          >
            <FormLabel>All Slots on Particular Date</FormLabel>

            <Divider />
            
            {
              isLoading ? (
                <Box>
                   
                  <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
                </Box>
              )  : events?.length < 1 ? (
              <Text p="20px">
                No slots are available for <>{selectedDay}</>{" "}
              </Text>
            ) : (
              events?.map((event, index) => (
            
                <Box
                  boxShadow="0 5px 15px rgba(0,0,0,0.06)"
                  p="20px"
                  mt="30px"
                  key={event?.slotId}
                >
                  <Flex justifyContent="space-around">
                  <Box>
                    <Text fontWeight="medium"> {event?.title}</Text>
                    <Text  fontWeight="medium" mb="10px">
                      {" "}
                      <>{event?.date}</>
                    </Text>
                  </Box>
                  <Button fontSize="12px" colorScheme="blue" onClick={()=>GotoViewSlotDetails(event.slotId,event.date)}>View Slot Details</Button>
                  </Flex>
                  <Box>
                    <Flex mt="10px" justifyContent="space-between">
                      <Text>Start - {event.startTime}</Text>
                      <Text>End - {event?.endTime}</Text>
                      {event?.status === "U" ? (
                        <Text  fontWeight="medium" color="blue">Unreserved</Text>
                      ) : (
                        <Text  fontWeight="medium" color="green">Reserved</Text>
                      )}
                      <Box onClick={()=>DeleteSlot(event.slotId)} cursor={"pointer"}>
                        <i className="fa-solid fa-trash-can"></i>{" "}
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default OneOnOneSlotsView;

import Navbar from '../../../Components/Navbar/Navbar'
import React, { useCallback, useEffect, useState } from 'react'
import OneOnOneCreateNav from '../AdminOneOnOneCreate/OneOnOneCreateNav'
import { Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { token,id as adminId} from "../../../Assets/Assets";
import { GetSlotsForDateService } from '../../../Services/AdminSideServices/GetEventsService'
import { compareDates, compareTimes, convertDateFormat, getCurrentTime, getTimeDifference } from '../../../utils/AddToAm'



const SlotDetails = () => {
    const [SlotDetails,setSlotDetails] = useState({

       
    
        "slotId": 0,
        "title": "",
        "instruction": "",
        "adminId": 1,
        "meetingLink": "",
        "startTime": "",
        "endTime": "",
        "date":"",
        "status": "",
        "userId": null
    
   
    })
const [isLoading,setIsLoading] = useState(true)

const date = localStorage.getItem("slotDate")
const toast = useToast()
const {id} = useParams()
const currentDate = convertDateFormat(new Date())
const [button,setButton] = useState<any>("")
const duration = getTimeDifference(SlotDetails.startTime,SlotDetails.endTime)
const navigate = useNavigate()



useEffect(()=>{
var val
    if(compareDates(currentDate,SlotDetails.date)===1 ){
 
       setButton(0)
    }else  if(compareDates(currentDate,SlotDetails.date)===0){
          val  = compareTimes(getCurrentTime(),SlotDetails.startTime,duration)
        setButton(val)
    }else{
        setButton(-1)
    }

},[SlotDetails.startTime,duration,SlotDetails.date,currentDate])


 
const GetEventByDate = useCallback(
    async () => {
      try {
        
        const response = await GetSlotsForDateService(adminId, date, token)

        if (response.length) {
          setIsLoading(false)
    response.forEach((el:any)=>{
        if(Number(id) === el.slotId){
  setSlotDetails(el)
        }
    })
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
    [toast,date,id]
  );


  useEffect(()=>{
GetEventByDate()
  },[GetEventByDate])

console.log(button)




  return (
    <div className="container">
    <Navbar />
    <Box
        position="fixed"
        h="auto"
        marginTop="62px"
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
            justifyContent={"space-around"}
            color={"gray.600"}
          >
            <Button
              borderRadius="15px"
              colorScheme="blue"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>

            <Text fontWeight="bold" fontSize="medium">
              {" "}
           Slot Details
            </Text>

          </Flex>
        </Box>
      </Box>
    <br/>
    <Box
      boxShadow="0 5px 15px rgba(0,0,0,0.06)"
      h="auto"
      ml="10%"
      mt="130px"
      bg="white"
      w="80%"
      p="2%"
      pb="100px"
    >
   <Box>
       {SlotDetails.slotId && <Table variant="striped" colorScheme="teal">
          
          <Tbody>
            <Tr>
              <Td fontWeight="medium">Name</Td>
              <Td fontWeight="medium" isNumeric>{SlotDetails?.title}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="medium">Date</Td>
              <Td fontWeight="medium" isNumeric>{SlotDetails?.date}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="medium">Instructions</Td>
              <Td fontWeight="medium" isNumeric>{SlotDetails?.instruction}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="medium">Meeting Location</Td>
              <Td fontWeight="medium" isNumeric>{SlotDetails?.meetingLink}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="medium">Start time</Td>
              <Td fontWeight="medium" isNumeric>{SlotDetails?.startTime}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="medium">End Time</Td>
              <Td fontWeight="medium" isNumeric>{SlotDetails?.endTime}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="medium">Slot Booking Status</Td>
              <Td fontWeight="medium" isNumeric>  {SlotDetails?.status === "U" ? (
                        <Text  fontWeight="medium" color="blue">Unreserved</Text>
                      ) : (
                        <Text  fontWeight="medium" color="green">Reserved</Text>
                      )}</Td>
            </Tr>
            </Tbody>
            </Table>
            

           
            
            }

            <Flex mt="30px" justifyContent="flex-end">
            {SlotDetails.date === currentDate && SlotDetails.status ==="B" && button === 1 ? (
  <Button colorScheme='blue' onClick={()=>navigate(SlotDetails.meetingLink)}>Join</Button>
) : button === -1 ? (
  <Text color='blue' fontSize="20px">Slot Expired</Text>
) : (
  <Text color='blue' fontSize="20px">Event is On {SlotDetails.date}</Text>
)}

            </Flex>
            </Box>
</Box>
    </div>
  )
}

export default SlotDetails
import React from "react";
import { Box, Text, Flex,  useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {  DeleteRecurringService } from "../../Services/AdminSideServices/GetEventsService";
import { IEventValues } from "../../Pages/AdminSidePages/Interfacces";
import { token } from "../../Assets/Assets";

interface ProfilecomponentProps {
  event: IEventValues;
  GetEvents:any;
  setshow1: (show: boolean) => void;
}

const SettingsComponent = ({ event, setshow1 ,GetEvents}: ProfilecomponentProps) => {
  const navigate = useNavigate();
  const toast = useToast();

  const GotoEdit = () => {
    navigate(`/admin/one-on-one-interviews/${event.recurringId}/edit`);
  };

  
  const DeleteEvent = async (id: any) => {
    try {
      const response = await DeleteRecurringService(id,token);

      if (response.message) {
        toast({
          title: "Event Deleted Successfully",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
        GetEvents()

        setshow1(false);
      }
    } catch (error) {
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        position="absolute"
        width="200px"
        height="auto"
        marginTop="10px"
        marginLeft="7%"
        border="1px solid #778087"
        borderRadius="5px"
        boxShadow="0 5px 15px rgba(0,0,0,0.06)"
        backgroundColor="white"
        p={3}
        zIndex="1"
      >
        <Flex pt="5px" onClick={GotoEdit}>
          <i className="fa-solid fa-pen" style={{ marginTop: "5px" }}></i>
          <Text color="#778087" fontSize="sm" pl="15px">
            <Link to="">Edit</Link>
          </Text>
        </Flex>
        
        <Flex pt="5px">
          <i
            className="fa-regular fa-trash-can"
            style={{ marginTop: "5px" }}
          ></i>
          <Text color="#778087" pl="15px">
            <Link to="" onClick={() => DeleteEvent(event?.recurringId)}>
              Delete
            </Link>
          </Text>
        </Flex>
      </Box>
    </div>
  );
};

export default SettingsComponent;

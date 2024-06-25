import Navbar from "../../../Components/Navbar/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import OneOnOneCreateNav from "../AdminOneOnOneCreate/OneOnOneCreateNav";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../Redux/eventById";
import { Box, Flex, FormLabel, Text, useToast } from "@chakra-ui/react";
import OneOnOneEdit from "../../../Components/OneOneOneEdit/OneOnOneEdit";
import { useParams } from "react-router-dom";
import { GetSingleEventsService } from "../../../Services/AdminSideServices/GetEventsService";
import {  IOneOnEventValues } from "../Interfacces";
import { id} from "../../../Assets/Assets";



//this component is for creating events  slots
const OneonOneSlotsEdit = () => {
  const [isNameEdit, setNameEdit] = useState(false);
  const dispatch = useDispatch();
  const { GetSingleData } = bindActionCreators(actionCreators, dispatch);
  const [EventValues, setEventValues] = useState<IOneOnEventValues>({
    title: "",
    instruction: "",
    meetingLink: "",
    adminId: id,
    category:"",
    duration: "",
  });
  const { paramsId } = useParams();
  const toast = useToast();

  const GetEventById = useCallback(async () => {
    try {
      const response = await GetSingleEventsService(paramsId);
    
      if (response.id) {
        setEventValues(response);
        GetSingleData(response);
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
  },[GetSingleData,paramsId,toast]);

  useEffect(() => {
    GetEventById();
  }, [GetEventById]);

  return (
    <div className="container">
      <Navbar />
      <OneOnOneCreateNav   NavText ="Edit One-On-One Event Type"/>
      <Box
        w="80%"
        ml="10%"
        mt="60px"
        minH="200px"
        h="auto"
        p="5%"
        bg="white"
        borderRadius="10px"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        {isNameEdit ? (
          <OneOnOneEdit
            setEventValues={setEventValues}
            EventValues={EventValues}
            isNameEdit={isNameEdit}
            setNameEdit={setNameEdit}
          />
        ) : (
          <Box
            onClick={() => setNameEdit(!isNameEdit)}
            cursor="pointer"
            boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
            p="20px"
            mt="5px"
            border="1px solid grey"
          >
            <Flex>
              <Box
                mt="12px"
                mr="10px"
                w="20px"
                h="20px"
                borderRadius="50%"
                backgroundColor="violet"
              />
              <FormLabel mt="10px" color="rgb(75 85 99)">
                What event is this ?{" "}
              </FormLabel>
            </Flex>

            <Flex>
              {" "}
              <Text>Title of event</Text>{" "}
              <Text ml="20px">Location of event</Text>
            </Flex>
          </Box>
        )}

         </Box>
    </div>
  );
};

export default OneonOneSlotsEdit;

import { EditEventsService } from "../../Services/AdminSideServices/GetEventsService";
import {
  Box,
  Divider,
  Flex,
  FormLabel,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import OneOnOneEventsCreateInput from  "../OneOnOneEventsCreateInput"

const OneOnOneEdit = ({
  setEventValues,
  EventValues,
  isNameEdit,
  setNameEdit,
}: any) => {
  const { id } = useParams();
  const toast = useToast();

  const SaveEvent = async () => {
    try {
      const response = await EditEventsService(EventValues, id);
      if (response.id) {
        toast({
          title: "Event updated Successfully",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
        setNameEdit(false);
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
      <Box p="20px" h="auto" border="1px solid grey" mt="5px">
        <Box onClick={() => setNameEdit(!isNameEdit)} h="auto" cursor="pointer">
          <Flex justifyContent="space-between">
            <Box>
              <Flex>
                <Box
                  mt="10px"
                  mr="10px"
                  w="20px"
                  h="20px"
                  borderRadius="50%"
                  backgroundColor="violet"
                />
                <FormLabel mt="10px" color="rgb(75 85 99)">
                Edit Values For This Event {" "}
                </FormLabel>
              </Flex>

              <Flex>
                {" "}
                <Text>{EventValues?.title}</Text>{" "}
                <Text ml="20px">{EventValues?.category}</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
     
          <Divider mt="10px" h="2px" /> 
        <OneOnOneEventsCreateInput
          EventValues={EventValues}
          setEventValues={setEventValues}
          setNameEdit={setNameEdit}
          SaveEvent={SaveEvent}
          buttonName={"Save"}
        />
      </Box>
    </div>
  );
};

export default OneOnOneEdit;

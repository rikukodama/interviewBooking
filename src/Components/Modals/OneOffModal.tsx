import React from "react";
import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useMediaQuery,
  Input,
  Flex,
} from "@chakra-ui/react";

const OneOffModal = ({ setIsOpen, isOpen ,ClearEventsBydate, AddSlots,modalBody }: any) => {
  const handleClose = () => setIsOpen(false);
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
 

  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Text p="30px">{modalBody}</Text>
            <Flex>
            <Input w="200px" placeholder="Add title to the event"  /> <Button ml="20px" colorScheme="blue">Add</Button>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              h={isLargerThan900 ? "35px" : "30px"}
              fontSize={isLargerThan900 ? "14px" : "auto"}
              color="white"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
             onClick ={()=>AddSlots()}
            >
           AddTimeSlots
            </Button>
            <Button
            ml="20px"
              h={isLargerThan900 ? "35px" : "30px"}
              fontSize={isLargerThan900 ? "14px" : "auto"}
              color="white"
              bg="rgb(31 41 55)"
              _hover={{ bg: "rgb(76, 84, 95)" }}
             onClick ={()=>ClearEventsBydate()}
            >
          Clear
            </Button>
            <Button
              h={isLargerThan900 ? "35px" : "30px"}
             fontSize= {isLargerThan900 ? "18px" : "14px"}
              color="white"
              bg="rgb(31 41 55)"
              ml="20px"
              _hover={{ bg: "rgb(76, 84, 95)" }}
              onClick={handleClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OneOffModal;
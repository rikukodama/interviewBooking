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
} from "@chakra-ui/react";

const CommonModalComponent = ({ isOpen, setIsOpen, modalBody }: any) => {
  const handleClose = () => setIsOpen(false);
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Text p="30px" fontWeight="medium">{modalBody}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              h={isLargerThan900 ? "35px" : "auto"}
              color="white"
              bg="rgb(31 41 55)"
              minH="30px"
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

export default CommonModalComponent;
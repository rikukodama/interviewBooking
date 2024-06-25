import React from "react";
import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const BulkEventNav = () => {
    const [isSmallerThan800] = useMediaQuery("(max-width: 600px)");
    const navigate = useNavigate();
    
    return (
        <div>
            <Box position="fixed" h="auto" marginTop={isSmallerThan800?'3cm':"62px"} bg="whiteAlpha.900" w="100%">
                <Box boxShadow="sm">
                    <Flex position={"relative"} w={"85%"} align="center" m="auto" h={"60px"} justifyContent={"space-between"} color={"gray.600"}>
                        <Button colorScheme="white" border={'2px'} borderColor={'black'} color={'black'} onClick={() => navigate(-1)}>
                            Back
                        </Button>
                        <Text fontWeight="bold" position={"relative"} fontSize="medium">
                            Create Bulk Interviews
                        </Text>

                    </Flex>
                </Box>
            </Box>
        </div>
    );
};

export default BulkEventNav;

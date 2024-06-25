import React from "react";
import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const InterviewCreateNav = () => {
    const [isSmallerThan800] = useMediaQuery("(max-width: 600px)");
    const navigate = useNavigate();

    return (
        <div>

            <Box position="relative" h="auto" marginTop={isSmallerThan800?'3cm':"62px"} bg="whiteAlpha.900" w="100%">

                <Box boxShadow="sm">
                    <Flex position={"relative"} w={"85%"} align="center" m="auto" h={"60px"} justifyContent={"space-between"} color={"gray.600"}>
                        <Button  colorScheme="white" border={'2px'} borderColor={'black'} color={'black'} onClick={() => navigate(-1)}>
                            Back
                        </Button>
                        <Text fontWeight="bold" position={"relative"} fontSize={['13px','14px','16px']}>
                            Create Single Interview
                        </Text>  
                     
                    </Flex>
                </Box>
            </Box>
        </div>
    );
};

export default InterviewCreateNav;

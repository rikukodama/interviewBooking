import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { Box, Text, Divider} from "@chakra-ui/react";

// this component is for when clicking on user name in navbar this component will display
interface ProfilecomponentProps {
  setshow1: (show: boolean) => void;
}

const AdminProfileComponent = ({ setshow1 }: ProfilecomponentProps) => {
  const navigate = useNavigate();

  const Logout = () => {

    localStorage.clear();
     sessionStorage.clear()
    setshow1(false);
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      position="absolute"
      width="200px"
      height="auto"
      marginTop="70px"
      marginLeft="85%"
      border="1px solid #778087"
      borderRadius="5px"
      boxShadow="0 5px 15px rgba(0,0,0,0.06)"
      backgroundColor="white"
      p={3}
      zIndex={2}
    >
      
    
      <Text color="#778087" padding="5px">
        <Link to="" onClick={() => setshow1(false)}>
         Share Your Link
        </Link>
      </Text>
      <Divider borderColor="gray.300" />
      <Text
       color="#778087"
        padding="10px"
        _hover={{ cursor: "pointer" }}
        onClick={Logout}
      >
        Logout
      </Text>
    </Box>
  );
};

export default AdminProfileComponent;
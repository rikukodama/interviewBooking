import { Box,  Flex, Image, Button  ,Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Text, useMediaQuery} from '@chakra-ui/react'
import React, {useState } from 'react'

import AdminProfileComponent from './AdminProfileComponent'

import { Link, NavLink, useNavigate} from 'react-router-dom'
import { masaiImage ,QuesTymes} from '../../Assets/Assets'
import { EventTypesNavbarArray } from '../../Assets/Assets'


const Navbar = () => {
  const [isSmallerThan1000] = useMediaQuery("(max-width: 600px)");
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
  const userType = userDetails?.user?.roles[0]?.name
  const linkTo = userType === "ROLE_ADMIN" ? "/admin/dashboard" : "/dashboard";

  const navigate = useNavigate();

  const Logout = () => {

    localStorage.clear();
     sessionStorage.clear()
    navigate("/login");
  };

 
  return (
    <div>
       <Box position="fixed" h="auto" top="0" bg="white" w="100%" zIndex={1000}>
        {isSmallerThan1000?
          <Flex align="center" flex={"2"} justifyContent={'space-around'}>
          <Link to={linkTo}>
              {" "}
              <Image h="50px" w="100px" objectFit="contain" src={masaiImage} alt="Masai logo" />
            </Link>
      </Flex>
        :null}
      <Box boxShadow="sm">
        <Flex
          position={"relative"}
          w={"97%"}
          align="center"
          m="auto"
          h={"60px"}
          justifyContent={"space-between"}
          color={"gray.600"}
        >
        {isSmallerThan1000 ? null : <Flex align="center" flex={"2"}>
          <Link to={linkTo}>
              {" "}
              <Image h="50px" w="100px" objectFit="contain" src={masaiImage} alt="Masai logo" />
            </Link>
      </Flex>}

{/* my */}

        <Flex
            justifyContent={'space-evenly'}
              align="center"
              w={["90%", "82%", "55%"]}
            >
              {EventTypesNavbarArray.map((el) => (
                <Box ml={["0px", "0px", "7px"]} key={el} className="li">
                  <NavLink  key={el} to={"/admin/" + el.toLowerCase()}>
                  <Text fontSize={['11px','13px','14px']} fontWeight="medium" mr={'3px'}> {el.split("-").join(" ")} </Text>
                  </NavLink>
                </Box>
              ))}
            </Flex>

      {/* <Flex align="center" flex={"2"}>
          <Link to={linkTo}>
              {" "}

              <Image h="50px" w="200px" objectFit="cover" src={QuesTymes} alt="quesTymes logo" />
            </Link>
      </Flex> */}



           <Box>
      <Popover  placement="top" isLazy>
        <PopoverTrigger>
          <Flex cursor="pointer">
          <Text >{userDetails?.user?.name}</Text>
          <i
                  style={{ marginLeft: "5px" ,marginTop:"4px"}}
                  className="fa-solid fa-caret-down"
                ></i>
                </Flex>
        </PopoverTrigger>
        <PopoverContent style={{ zIndex: 9999 }} marginTop="80px" marginRight="10px">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{userDetails?.user?.name}</PopoverHeader>
          <PopoverBody  >
            {/* Popover content */}
            <Text cursor="pointer" onClick={Logout}>Logout</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      </Box>
      </Flex>
      </Box>
   
   </Box>
    
 

    </div>
  )
}

export default Navbar
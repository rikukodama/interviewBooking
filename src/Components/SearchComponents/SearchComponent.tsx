import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";



const SearchComponent = ({search,updateSearch,value,name}:any) => {
  const [searchTerm, setSearchTerm] = useState("");

useEffect(()=>{
setSearchTerm(value)
},[value])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    if(name ==="batch"){
      updateSearch({
        ...search,
      "batch":event.target.value
      });
    }else{
      updateSearch({
        ...search,
      "name":event.target.value
      });
    }
   
   
  };

 
  return (
    <div>
      <Box mt="10px" mb="10px">
      <InputGroup w={'100%'}>
    <InputLeftElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />

    <Input type='text' value={searchTerm} placeholder="Search..." onChange={handleInputChange} />

  </InputGroup>
      </Box>
    </div>
  );
};

export default SearchComponent;

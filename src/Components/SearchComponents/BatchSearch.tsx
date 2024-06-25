import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";



const BatchSearch = ({search,updateSearch,value,name}:any) => {
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
    }else if(name==="name"){
      updateSearch({
        ...search,
      "name":event.target.value
      });
    }else{
        updateSearch({
            ...search,
          "category":event.target.value
          });
    }
   
   
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchTerm(event.target.value)
    if(name ==="batch"){
      updateSearch({
        ...search,
      "batch":event.target.value
      });
    }else if(name==="name"){
      updateSearch({
        ...search,
      "name":event.target.value
      });
    }else{
        updateSearch({
            ...search,
          "category":event.target.value
          });
    }
   
   
  };
  return (
    <div>
      <Box mt="10px" mb="10px">
      {/* <InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />
    <Input type='text' value={searchTerm} placeholder="search " onChange={handleInputChange} />
  </InputGroup> */}

  <select value={searchTerm} onChange={handleSelectChange} style={{
width:"100%",
border:"1px solid #E2E8F0",
height:"40px",
padding:"5px",
borderRadius:"5px"
  }}
  >
    <option value="">CHOOSE BATCH</option>
    <option value="SB">SB201</option>
    <option value="DSA">DSA</option>
    <option value="MERN">MERN</option>
    <option value="JAVA">JAVA</option>
    <option value="CSBT">CSBT</option>
    <option value="GENERAL">GENERAL</option>
    <option value="PLACEMENT">PLACEMENT</option>
    {/* "",
    "",
    "DSA",
    "",
    "",
    "" */}
  </select>
      </Box>
    </div>
  );
};

export default BatchSearch;

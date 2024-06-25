import React, { useState } from "react";
import { Box, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { interview } from "../../Pages/UserDashboard/UserDashboard";

interface Props {
  interviews: interview[];
  setFilteredItem: (interview: interview[]) => void;
}
const SearchByTitle: React.FC<Props> = ({ interviews, setFilteredItem }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  console.log("inter",interviews)


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log("searchTerm",searchTerm)
    setTimeout(()=>{
      if(searchTerm){
        const temp = interviews.filter((item) =>item.title.toLowerCase().includes(searchTerm.toLowerCase()))
        console.log("temp",temp)
        temp.length>0 && setFilteredItem(temp)
      }
    },1000)
    
   ;
  };
  setFilteredItem(interviews)
  
  return (
    <div>
      <Box mt="10px" mb="10px">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
           
          />
          <Input
            type="tel"
            placeholder="search"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </InputGroup>
      </Box>
    </div>
  );
};

export default SearchByTitle;

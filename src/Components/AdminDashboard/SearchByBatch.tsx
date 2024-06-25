import React, { useCallback,  useState } from "react";
import { Box, Button, Flex, FormLabel,  useToast } from "@chakra-ui/react";

import { useSearch } from "../../utils/SetParams";
import SearchComponent from "../SearchComponents/SearchComponent";
import { CountByBatchStatusService } from "../../Services/AdminSideServices/GetEventsService";
import { IntervieStatusByBatch } from "../../Assets/Assets";
import TableForStats from "./TableForStats";

const SearchByBatch = ({ batchName, setBatchName }: any) => {
  const [totalInterviews, setTotalInterviews] = useState(IntervieStatusByBatch);
  const [search, updateSearch] = useSearch();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // if batchname then call the api to get details on batch
  const GetBatchStatus = useCallback(async () => {
    if (batchName !== "") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);

      try {
        const response = await CountByBatchStatusService(batchName);
        if (response.results) {
          setTotalInterviews(response);
        }
      } catch (err) {
        toast({
          title: "Something Went Wrong",
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }, [toast, batchName]);

  return (
    <div>
      <Box
        w={["93%","85%","75%"]}
        m={'auto'}
        mt="30px"
        minH="200px"
        h="auto"
        p="2%"
        bg="white"
        borderRadius="10px"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Box w="90%" m="auto" pb={'20px'} pt={'15px'}>
          <Flex justifyItems="center" mb="20px">
            <FormLabel fontSize={["12px","15px","18px"]} style={{ margin: "0 auto" }}>
              The Status of Interviews in a Particular Batch
            </FormLabel>
          </Flex>
          {/* <FormLabel textAlign={'center'}>Search By Batch</FormLabel> */}
          <Box>
            <SearchComponent
              search={search}
              updateSearch={updateSearch}
              value={batchName}
              name="batch"
            />{" "}
            <Button
              isLoading={loading}
              w={'100%'}
              colorScheme="blue"
              mt="10px"
              mb={'1cm'}
              onClick={GetBatchStatus}
            >
              Search
            </Button>{" "}
          </Box>

          <Box w="100%">
            <TableForStats totalInterviews={totalInterviews} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SearchByBatch;

import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Grid,
  Image,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  useToast,
} from "@chakra-ui/react";

import AdminInterviewBox from "../AdminInterviews/InterviewsComponent";
import { useLocation} from "react-router-dom";
import { GetByPendingStatusService } from "../../Services/AdminSideServices/GetEventsService";
import Pagination from "./Pagination";
import { meetingStausButtons } from "../../Assets/Assets";
import { itemsPerPage ,token} from "../../Assets/Assets";


const SearchByPendingStauts = ({ clearUrl, search, updateSearch }: any) => {
  const [Interviews, setInterviews] = useState([]);
  const [PaginatedInterviewsData, setPaginatedInterviewsData] = useState([]);
  const [interviewStatus, setInterviewStatus] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState<number>(1);
  const [endIndex, setEndIndex] = useState<number>();
  const [batchName, setBatchName] = useState("");
  const toast = useToast();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageNumber = params.get("page");
  const meeting = params.get("meeting-status");
  const batch = params.get("batch");
  const [activeButton, setActiveButton] = useState<number | null>(null);
const [isLoading,setIsLoading] = useState(false)

 useEffect(()=>{
  setIsLoading(true)
  setTimeout(()=>{
    setIsLoading(false)
  },2000)
 },[meeting])

  // set color to buttons even after refreshing
  const setColor = useCallback(() => {
    meetingStausButtons.map((el, index) => {
      if (el.toLowerCase() === interviewStatus) {
        setActiveButton(index);
      }
      if (interviewStatus === "pending") {
        setStatus("P");
      } else if (interviewStatus === "completed") {
        setStatus("E");
      } else if (interviewStatus === "started") {
        setStatus("S");
      } else if (interviewStatus === "cancelled") {
        setStatus("C");
      } else if (interviewStatus === "started-by-student") {
        setStatus("SS");
      } else if (interviewStatus === "started-by-interviewer") {
        setStatus("IS");
      } else if (interviewStatus === "ended-by-student") {
        setStatus("SE");
      } else if (interviewStatus === "ended-by-interviewer") {
        setStatus("IE");
      }
      return null
    });
  }, [interviewStatus]);

  //when getting from url params we should get values
  useEffect(() => {
    if (pageNumber) {
      const page = parseInt(pageNumber);
      setCurrentPage(page);
    }
    if (meeting) {
      setInterviewStatus(meeting);
      setColor();
    }
    if (batch) {
      setBatchName(batch);
    }
  }, [pageNumber, meeting, setColor, setCurrentPage, batch]);

  // getting interviews based on pending and compleated when click on button
  const GetByPendingStatus = useCallback(async () => {
    try {
      const response = await GetByPendingStatusService(
        batchName,
        status,
        token
      );
      console.log(response)

      if (response.length) {
        setInterviews(response);
        setTotalPages(Math.ceil(response?.length / itemsPerPage));
        setCurrentPage(1);
      } else {
        setStartIndex(0);
        setTotalPages(0);
        setInterviews([]);
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [toast,  batchName, status]);

  useEffect(() => {
    GetByPendingStatus();
  }, [GetByPendingStatus]);

  // set paginated data
  useEffect(() => {
    // console.log(Interviews)
    if (Interviews.length) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setStartIndex(startIndex + 1);
      setEndIndex(endIndex);
      const Paginatedinterviewsdata = Interviews?.slice(startIndex, endIndex);
      if (endIndex > Interviews.length) {
        setEndIndex(Interviews.length);
      } else {
        setEndIndex(endIndex);
      }
      setPaginatedInterviewsData(Paginatedinterviewsdata);
    } else {
      setStartIndex(0);
      setEndIndex(0);
      setPaginatedInterviewsData([]);
    }
  }, [currentPage, Interviews]);

  // when click clear button everything should be clear url filter values
  const Clear = () => {
    setActiveButton(-100);
    setInterviewStatus("");
    setCurrentPage(0);
    clearUrl();
    setInterviews([]);
    setTotalPages(0);
  };

  // changing colors for button when click on pending and comleated
  const handleButtonClick = (index: number, val: string) => {
    setActiveButton(index);
    GetByPendingStatus();
    updateSearch({
      ...search,
      "meeting-status": val,
    });
  };

  // for handling page buttn value
  const handlePageChange = (page: any) => {
    updateSearch({
      ...search,
      page: page,
    });
  };

  return (
    <div>
      <Box
        w="80%"
        ml="10%"
        mt="30px"
        minH="200px"
        h="auto"
        p="2%"
        bg="white"
        borderRadius="10px"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Flex justifyItems="center">
   

          <FormLabel fontSize={["15px","17px","20px"]} style={{ margin: "0 auto" }}>
            Display Events Based on Meeting Status

          </FormLabel>
        </Flex>
        <Flex justifyContent="center" flexWrap="wrap">
          {meetingStausButtons?.map((status, index) => (
            <Button
              w={'auto'}
              mt="20px"
              key={index}
              onClick={() => handleButtonClick(index, status.toLowerCase())}
              fontSize={{ base: "11px", sm: "13px", md: "13px", lg: "14px" }}
              colorScheme={activeButton === index ? "green" : "blue"}
              mr="10px"
            >
              {status.split("-").join(" ")}
            </Button>
          ))}
          <Button mt="20px" onClick={Clear} colorScheme="blue">
            Clear
          </Button>
        </Flex>

        <Divider mt="10px" mb="10px" />

        {
  isLoading ? (
    <Box>
      {/*   */}
      <SimpleGrid mt={10} columns={[1, 2, 3]} spacing='40px'>
        <Skeleton height='300px' />       
        <Skeleton height='300px' />
        <Skeleton height='300px' />
    </SimpleGrid>
    </Box>
  ) : PaginatedInterviewsData?.length <= 0 ? (
    <Box>
       <Image
        w="40%"
        h="250px"
        mt="3%" ml="30%"
        src={
          "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=2000"
        }
      />
      <Text fontSize="20px" mt="20px" ml="40%">
        No Events were Found
      </Text>
    </Box>
  ) : (
          <Grid
            mt={4}
            templateColumns={{
              base: "1fr",
              md: "1fr 1fr 1fr",
              lg: "1fr 1fr 1fr",
            }}
            gap={2}
          >
            {PaginatedInterviewsData?.map((el) => (
              <Box key={el}>
                <AdminInterviewBox event={el} GetEvents={GetByPendingStatus} />
              </Box>
            ))}
          </Grid>
        )}
      </Box>
      <Box w="80%" ml="10%" mt="30px">
        <Box mt="20px" display="flex" justifyContent="space-between">
          <Text ml="30px">
            Showing {startIndex} to {endIndex} of {Interviews?.length} results
          </Text>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
            setPage={setCurrentPage}
            interviewsData={Interviews}
         
            setPaginatedData={setPaginatedInterviewsData}
            perPage={itemsPerPage}
          />
        </Box>
      </Box>
    </div>
  );
};

export default SearchByPendingStauts;

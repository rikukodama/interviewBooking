
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormLabel,
  Grid,
  Image,
  Input,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  useToast,
} from "@chakra-ui/react";
import AdminInterviewBox from "./InterviewsComponent";
import { useLocation } from "react-router-dom";
import SearchComponent from "../SearchComponents/SearchComponent";
import { useSearch } from "../../utils/SetParams";
import Pagination from "../AdminDashboard/Pagination";
import { Iinterviews } from "../../Services/AdminSideServices/GetEventsInterface";
import { GetFutureInterviewService, GetPastInterviewService } from "../../Services/UserSideServices/GetInterviewsServices";
import OneonOneEventComponent from "../OneonOneEventComponent";
import { GetRecurringListService } from "../../Services/AdminSideServices/GetEventsService";
import BatchSearch from "../SearchComponents/BatchSearch";
import { itemsPerPage ,token,id} from "../../Assets/Assets";
import { setLocale } from "yup";
import moment from "moment";

const FutureOrPastInterviewsComponent = ( ) => {
  const [futureInterviews, setfutureInterviews] = useState<Iinterviews[]>([]);
  const [allData,setAllData] = useState<Iinterviews[]>([]);
  const [PaginatedInterviewsData,setPaginatedInterviewsData] = useState<Iinterviews[]>([])
  const [searchName,setSearchName] = useState("")
  const [batchName,setBatchName] = useState("")
  const [search, updateSearch] = useSearch();
  const [currentPage, setCurrentPage] = useState<any >(1);
  const [startIndex, setStartIndex] = useState<number>(1);
  const [endIndex, setEndIndex] = useState<number>();
  const [totalPages,setTotalPages] = useState(0)
  const toast = useToast();
  const location = useLocation();
  const [searchDate, setSearchDate] = useState<string>("");
const [isLoading,setIsLoading] = useState(true);
const [section,SetSection] = useState<string>("")
  const params = new URLSearchParams(location.search);
  const pageNumber = params.get("page");
 



  const path = window.location.pathname;
  const segments = path.split('/');
  const InterviewsValueUrl= segments[segments.length - 1];
  let currDateTime = new Date();
  let dateString = currDateTime.toLocaleDateString();
  let dateArray = dateString.split("/").map(Number);
  const setDateTime = (value: any) => {
    if (value < 10) {
      return `0${value}`;
    } else {
      return value;
    }
  };
  let month = setDateTime(dateArray[0]);
  let date = setDateTime(dateArray[1]);
  let year = setDateTime(dateArray[2]);

  //when getting from url params we should get values
  useEffect(() => {
    if (pageNumber) {
      const page = parseInt(pageNumber);
      setCurrentPage(page);
    }
  }, [pageNumber]);

  const GetPagination = useCallback(() => {
    if (futureInterviews) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setStartIndex(startIndex + 1);
      setEndIndex(endIndex);
      const Paginatedinterviewsdata = futureInterviews?.slice(
        startIndex,
        endIndex
      );
      if (endIndex > futureInterviews.length) {
        setEndIndex(futureInterviews.length);
      } else {
        setEndIndex(endIndex);
      }
      setPaginatedInterviewsData(Paginatedinterviewsdata);
    }
  }, [currentPage, futureInterviews]);

  useEffect(() => {
    GetPagination();
  }, [GetPagination]);

  //function for filter data
  useEffect(() => {
    if (searchName || batchName||searchDate) {
      let interviews = allData.filter(
        (el: any) =>
          el.title?.toLowerCase().includes(searchName?.toLowerCase()) &&
          el.batch?.toLowerCase().includes(batchName?.toLowerCase())
      );
      if (searchDate) {
        const dateFormat = moment(searchDate).format("DD-MM-yyyy")
        // ;YYY-MM-DD
     
        interviews = interviews.filter((el: any) =>
          el.date?.includes(dateFormat)
        );
      }
      setfutureInterviews(interviews);
      setTotalPages(Math.ceil(interviews?.length / itemsPerPage));
      if (interviews.length === 0) {
        setStartIndex(0);
      }
    } else if (batchName === "" || searchName === "") {
      setfutureInterviews(allData);
      setTotalPages(Math.ceil(futureInterviews?.length / itemsPerPage));
    }
  }, [allData,searchDate, searchName, batchName, futureInterviews]);

  // get interviews data
  const GetEvents = useCallback(async () => {
    try {

        var response;
     if(InterviewsValueUrl==="upcoming-interviews"){
      SetSection("upcoming-interviews")

        response = await GetFutureInterviewService(id,token)
     }else if(InterviewsValueUrl==="past-interviews"){
      SetSection("past-interviews")
        response = await GetPastInterviewService(id,token)  
     }else{
      response = await GetRecurringListService(token,id)
    
     }

     if(response.length){
      setIsLoading(false)
      setTotalPages(Math.ceil(response?.length/itemsPerPage));
        setAllData(response);
        setfutureInterviews(response);
      } else {
        setStartIndex(0);
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
  }, [toast, InterviewsValueUrl]);

  useEffect(() => {
    GetEvents();
  }, [GetEvents]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    const page = params.get("page");
    const batch = params.get("batch");
    const date = params.get("date");
    if (name) {
      setSearchName(name);
      setCurrentPage(1);
    } else {
      setSearchName("");
    }
    if (page) {
      setCurrentPage(page);
    }
    if (batch) {
      setBatchName(batch);
      setCurrentPage(1);
    } else {
      setBatchName("");
    }
    if (date) {
      setSearchDate(date);
      setCurrentPage(1);
    } else {
      setSearchDate("");
    }
  }, [
    setSearchName,
    currentPage,
    batchName,
    updateSearch,
    search,
    searchName,
    location.search,
  ]);

  // for handling page buttn value
  const handlePageChange = (page: any) => {
    updateSearch({
      ...search,
      page: page,
    });
  };
  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
   
  ) => {

    if (event.target.name === "date") {
      updateSearch({
        ...search,
        date: event.target.value,
      });

  }}
  return (
    <div className="container">
      <Box
        w="80%"
        ml="10%"
        mt="130px"
        minH="200px"
        h="auto"
        // bg={"#ffffff93"}
        // p="5%"
        borderRadius="10px"
      >

       <Box w="100%" 
        p="2%"
        mr="10px" bg={"#ffffff"}>
          <FormLabel>Title</FormLabel>
        <SearchComponent value={searchName} search={search} updateSearch={updateSearch} name="name"/>
        <Flex justifyContent="space-between" direction={["column","row"]} w="100%" bg={"#ffffff93"}>
          <Box w={["100%","50%"]} mr="10px">
          <FormLabel>Date</FormLabel>
        {/* <SearchComponent value={searchName} search={search} updateSearch={updateSearch} name="date"/> */}
       <Input type="date" 
        value={searchDate}
        min={`${year}-${month}-${date}`}
       name="date" onChange={handleDateChange}/> 
        </Box>
        <Box w={["100%","50%"]}>
        <FormLabel>Batch</FormLabel>
       <BatchSearch  value={batchName} search={search} updateSearch={updateSearch} name="batch" />
       </Box>
       </Flex>
       </Box>

       {
  isLoading ? (
    <Box>
      <SimpleGrid mt={10} columns={[1, 2, 3]} spacing='40px'>
        <Skeleton height='300px' />
        <Skeleton height='300px' />
        <Skeleton height='300px' />
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
  ) : ( <Grid
      mt={4}
      templateColumns={{
        base: "1fr",
        md: "1fr 1fr",
        lg: "1fr 1fr 1fr",
      }}
      gap={10}
    >
      {/* -------------------Updating Card UI */}
      {PaginatedInterviewsData?.map((el) => (
        <Box key={el.interviewId} 
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
        bg={"white"}
        >
          {InterviewsValueUrl==="one-on-one-interviews" ? (
            <OneonOneEventComponent event={el} GetEvents={GetEvents} />
          ) : (
            <AdminInterviewBox section={section} event={el} GetEvents={GetEvents} />
          )}
        </Box>
      ))}
    </Grid>
  )
}


      </Box>

      <Box w="80%" ml="10%" mt="30px">
        <Box mt="20px" display="flex" justifyContent="space-between">
          <Text ml="30px">
            Showing {startIndex} to {endIndex} of {futureInterviews?.length}{" "}
            results
          </Text>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
            interviewsData={futureInterviews}
            setPage={setCurrentPage}
            setPaginatedData={setPaginatedInterviewsData}
            perPage={itemsPerPage}
          />
        </Box>
      </Box>
    </div>
  );

}

export default FutureOrPastInterviewsComponent;



import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  Text,
  Flex,
  Divider,
  Stack,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import moment from 'moment';
import { interview } from "../UserDashboard/UserDashboard";
import { Link } from "react-router-dom";
import Header from "../../Components/CommonComponents/Header";
import Navbar from "../../Components/Navbar/Navbar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { convertTimeFormat } from "../../utils/index";
import { Action } from "../../Redux/PastInterviewReducer/Action";
import { Dispatch } from "redux";
import { getAllPastInterviewService } from "../../Services/UserSideServices/GetAllPastInterviewServices/GetAllPastInterviewService";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearch } from "../../utils/SetParams";
import Pagination from "../../Components/AdminDashboard/Pagination";
import { useCallback } from "react";
import { GetCategoryService } from "../../Services/AdminSideServices/GetEventsService";
import UserNavbar from "../../Components/Navbar/UserNavbar";
const PastEvents = () => {
  const interviews = useSelector(
    (state: RootState) => state.PastInterViewReducer.interviews
  );
  const dispatch: Dispatch<Action> = useDispatch();
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const userId: number = userDetails?.user?.id;
  const [search, updateSearch] = useSearch();
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [PaginatedInterviewsData, setPaginatedInterviewsData] = useState<
    interview[]
  >([]);
  const [allData, setAllData] = useState<interview[]>([]);
  const [filteredItem, setFilteredItem] = useState<interview[]>([]);
  const [startIndex, setStartIndex] = useState<any>(1);
  const [endIndex, setEndIndex] = useState<number>();
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [searchBatch, setSearchBatch] = useState<string>("");
  const [searchDate, setSearchDate] = useState<string>("");
  const [category, setCategory] = useState([]);
  const location = useLocation();
  const token: string = userDetails.token;
  const toast = useToast();
  const itemsPerPage = 9;

   const GetCategory = useCallback(async () => {
     try {
       const response = await GetCategoryService(token);
 
       if (response.length) {
         setCategory(response);
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
   }, [toast, token]);
 
   useEffect(() => {
     GetCategory();
   }, [GetCategory]);

   //function for filter data
   useEffect(() => {
    if (searchTitle || searchBatch || searchCategory || searchDate) {
      console.log("hdghdf", searchTitle, "dfjhd", searchBatch);
      let filteredInterviews = allData;
      if (searchTitle) {
        filteredInterviews = filteredInterviews.filter((el: any) =>
          el.title?.toLowerCase().includes(searchTitle?.toLowerCase())
        );
      }
      if (searchBatch) {
        filteredInterviews = filteredInterviews.filter((el: any) =>
          el.batch?.toLowerCase().includes(searchBatch?.toLowerCase())
        );
      }
      if (searchCategory) {
        filteredInterviews = filteredInterviews.filter((el: any) =>
          el.category?.toLowerCase().includes(searchCategory?.toLowerCase())
        );
      }
      if (searchDate) {
        const dateFormat = moment(searchDate).format("DD-MM-yyyy");
        console.log("dhhjdgf", dateFormat)
        filteredInterviews = filteredInterviews.filter((el: any) =>
          el.date?.includes(dateFormat)
        );
      }
        console.log("filtered Item", filteredInterviews)

      setFilteredItem(filteredInterviews);
      setTotalPages(Math.ceil(filteredInterviews?.length / itemsPerPage));
      if (filteredInterviews.length === 0) {
        setStartIndex(0);
      }
    } else {
      setFilteredItem(allData);
      setTotalPages(Math.ceil(allData?.length / itemsPerPage));
    }
  }, [allData, searchTitle, searchBatch, searchCategory, searchDate]);

  //for getting interview data
  useEffect(() => {
    if (interviews?.length === 0) {
      getAllPastInterviewService(userId, token)(dispatch);
      console.log("hi am useEffect");
    }
    if (interviews.length > 0) {
      setFilteredItem(interviews);
      setAllData(interviews);
      console.log("filtered", filteredItem);
    }
  }, [dispatch, interviews?.length]);
//for set param
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const title = params.get("title");
  const category = params.get("category");
  const batch = params.get("batch");
  const date = params.get("date");
  const page = params.get("page");
  if (title) {
    setSearchTitle(title);
    setCurrentPage(1);
  } else {
    setSearchTitle("");
  }
  if (category) {
    setSearchCategory(category);
    setCurrentPage(1);
  } else {
    setSearchCategory("");
  }
  if (batch) {
    setSearchBatch(batch);
    setCurrentPage(1);
  } else {
    setSearchBatch("");
  }
  if (date) {
    setSearchDate(date);
    setCurrentPage(1);
  } else {
    setSearchDate("");
  }
  if (page) {
    setCurrentPage(page);
  }
}, [  currentPage,
    updateSearch,
  search,
  location.search,
]);
//for searching 
const handleInputChange = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
) => {
  if (event.target.name === "title") {
    updateSearch({
      ...search,
      title: event.target.value,
    });
  } else if (event.target.name === "category") {
    updateSearch({
      ...search,
      category: event.target.value,
    });
  } else if (event.target.name === "batch") {
    updateSearch({
      ...search,
      batch: event.target.value,
    });
  } else if (event.target.name === "date") {
    updateSearch({
      ...search,
      date: event.target.value,
    });
  }
};
//get pagination
  const GetPagination = useCallback(() => {
    if (filteredItem) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setStartIndex(startIndex + 1);
      setEndIndex(endIndex);
      const Paginatedinterviewsdata = filteredItem?.slice(startIndex, endIndex);
      if (endIndex > filteredItem.length) {
        setEndIndex(filteredItem.length);
      } else {
        setEndIndex(endIndex);
      }
      setPaginatedInterviewsData(Paginatedinterviewsdata);
      setTotalPages(Math.ceil(filteredItem?.length / itemsPerPage));
    }
  }, [currentPage, itemsPerPage, filteredItem]);

  useEffect(() => {
    GetPagination();
  }, [GetPagination]);
  const handlePageChange = (page: any) => {
    updateSearch({
      ...search,
      page: page,
    });
  };
 
  return (
    <div className="container">
      {/* <Navbar />
      <Header title={"Past Events"} buttonName={"Back"} /> */}
      <UserNavbar title={"Past Events"} buttonName={"+ Book 1-1"}  />
      <Header title={"Past Events"} buttonName={"Back"} />
      <br/>
      <main>
        <Box bg={"#f1f5f9"}>
          <Box h={"auto"} w={['95%','90%','85%']} margin={"auto"} mt="130px" pt={"20px"}>
            <Box
            w={'100%'}
              bg="white"
              mt="10px"
              mb="10px"
              minH="200px"
              h="auto"
              p="15px"
              borderRadius="10px"
              boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
            >
              <Box>
                <FormLabel fontSize={['13px','14px','14px']} mt="10px" color="rgb(75 85 99)">
                  Search By Title
                </FormLabel>
                <InputGroup border={"none"}>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                    outline={"none"}
                    border={"none"}
                  />
                  <Input
                    type="tel"
                    placeholder="Search Title"
                    name="title"
                    value={searchTitle}
                    onChange={handleInputChange}
                    outline={"none"}
                    border={"none"}
                  />
                </InputGroup>
              </Box>
              <Flex justifyContent="space-between" w="100%">
                <Box w="32%" mr="10px">
                <FormLabel fontSize={['13px','14px','14px']} mt="10px" color="rgb(75 85 99)">
                    Category
                  </FormLabel>
                  <Select
                    name="category"
                    value={searchCategory}
                    onChange={handleInputChange}
                    placeholder="category"
                  >
                    {category?.map((e: any) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box w="32%" mr="10px">
                <FormLabel fontSize={['13px','14px','14px']} mt="10px" color="rgb(75 85 99)">
                    Date
                  </FormLabel>
                  <Input
                    value={searchDate}
                    onChange={handleInputChange}
                    name="date"
                    type="date"
                    // min={`${year}-${month}-${date}`}
                  />
                </Box>
                <Box w="32%" mr="10px">
                <FormLabel fontSize={['13px','14px','14px']} mt="10px" color="rgb(75 85 99)">
                    Batch
                  </FormLabel>
                  <Input
                    onChange={handleInputChange}
                    name="batch"
                    type="text"
                    value={searchBatch}
                  />
                </Box>
              </Flex>
            </Box>
            <Box
              w={"100%"}
              h={"auto"}
              m={"auto"}
              mt={"5px"}
              pl={"20px"}
              pr={"20px"}
              pt={"30px"}
              pb={"30px"}
             
              borderRadius={"10px"}
            >
              {/* grid layout of scheduled interview */}
              <Grid templateColumns={["repeat(1,1fr)","repeat(2,1fr)","repeat(3,1fr)"]} gap={6}>
                {PaginatedInterviewsData.length > 0 &&
                  PaginatedInterviewsData.map((item: interview) => {
                    return (
                      <GridItem
                      key={item.interviewId}
                        w={"100%"}
                        h={"auto"}
                        border={" 1px solid #bdc4c39a"}
                        bg={"white"}
                        cursor={"pointer"}
        p="3%"
        boxShadow="0 5px 15px rgba(0,0,0,0.06)"
        borderRadius="9px"
        letterSpacing={0.1}
        fontWeight={400}
                      >
                        <Box>
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Box>
                              <Text
                                 fontSize={"18px"}
                                 fontWeight={"600"}
                                 ml={"15px"}
                                 mt={"10px"}
                                 // maxW={"200px"}
                                 color={"#000000ce"}
                                 letterSpacing={0.1}
                                 isTruncated
                              >
                                {item?.title.toUpperCase()}
                              </Text>
                            </Box>
                          </Flex>
                          <Stack>
                            <Flex
                              justifyContent={"space-between"}
                              mt={"10px"}
                              pl={"15px"}
                              pr={"15px"}
                            >
                              <Box>
                                <Text 
                                  color={"#727a7ad5"}
                                >Start Time</Text>
                                <Text
                                mt={"7px"}
                                border={"1px solid #166534a8"}
                              color={"#166534bd"} borderRadius={100} pr={1} pl={1}
                                >{convertTimeFormat(item.startTime)}</Text>
                              </Box>
                              <Box>
                                <Text
                                  color={"#727a7ad5"}
                                >End Time</Text>
                                <Text
                                     mt={"7px"}
                                     border={"1px solid #991b1b8e"}
                                   color={"#991b1bc4"} borderRadius={100} pr={1} pl={1}                                
                                >{convertTimeFormat(item.endTime)}</Text>
                              </Box>
                            </Flex>
                            <Divider orientation="horizontal" mt={"10px"} />
                            <Flex
                              justifyContent={"space-between"}
                              mt={"10px"}
                              pr={"15px"}
                              pl={"15px"}
                            >
                              <Text>{item.interviewerName}</Text>
                              <Text>{item.category}</Text>
                            </Flex>
                          </Stack>
                          <Flex
                            justifyContent={"space-between"}
                            borderTop={"1px solid gray"}
                            alignItems={"center"}
                            mt={"10px"}
                            w={"100%"}
                            p={"10px"}
                          >
                            <Box></Box>
                            <Box>
                              <Link
                                to={`/dashboard/interview/${item.interviewId}`}
                              >
                                <Button
                                  variant={"link"}
                                  float={"right"}
                                  mt={"1px"}
                                  colorScheme="blue"
                                >
                                  Details &gt;
                                </Button>
                              </Link>
                            </Box>
                          </Flex>
                        </Box>
                      </GridItem>
                    );
                  })}
              </Grid>
            </Box>
          </Box>
          
          <Flex
        justifyContent="space-between"
        alignItems={"center"}
        w={"75%"}
        m={"auto"}
        h={"100px"}
      >
        <Text ml="30px">
          Showing {startIndex} to {endIndex} of {filteredItem?.length} results
        </Text>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={handlePageChange}
          setPage={setCurrentPage}
          interviewsData={interviews}
          setPaginatedData={setPaginatedInterviewsData}
          perPage={itemsPerPage}
        />
      </Flex>
        </Box>
      </main>
      
    </div>
  );
};

export default PastEvents;

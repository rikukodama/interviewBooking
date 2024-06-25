import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  Flex,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import moment from 'moment';
import { CopyIcon } from "@chakra-ui/icons";
import { MdSettings } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import { FaRegClone } from "react-icons/fa";
import Header from "../../Components/CommonComponents/Header";
import { GetAllScheduledInterView } from "../../Services/UserSideServices/GetAllScheduledInterviewServices/GetInterviewsServices";
import { convertTimeFormat } from "../../utils/index";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Dispatch } from "redux";
import {
  scheduledInterviewFailure,
  scheduledInterviewLoading,
  scheduledInterviewSuccess,
} from "@/Redux/ScheduledInterviewUser/Action";
import Pagination from "../../Components/AdminDashboard/Pagination";
import {
  InputGroup,
  InputLeftElement,
  Input,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useCallback } from "react";
import { useSearch } from "../../utils/SetParams";
import { GetCategoryService } from "../../Services/AdminSideServices/GetEventsService";
import UserNavbar from "../../Components/Navbar/UserNavbar";

export interface interview {
  interviewId: number;
  interviewerName: string;
  intervieweeName: string;
  startTime: string;
  endTime: string;
  date: string;
  category: string;
  instructions: string;
  title: string;
  meetingLink: string;
  batch: string;
  meetingStatus: string;
  studentNote: string;
  adminFeedback: string;
}
const UserDashboard = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [search, updateSearch] = useSearch();
  const interviews = useSelector(
    (state: RootState) => state.ScheduledInterviewReducer.interviews
  );
  const [copyText, setCopyText] = useState("");
  const dispatch: Dispatch<
    | scheduledInterviewSuccess
    | scheduledInterviewLoading
    | scheduledInterviewFailure
  > = useDispatch();
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [PaginatedInterviewsData, setPaginatedInterviewsData] = useState<
    interview[]
  >([]);
  const [filteredItem, setFilteredItem] = useState<interview[]>([]);
  const [allData, setAllData] = useState<interview[]>([]);
  const [startIndex, setStartIndex] = useState<any>(1);
  const [endIndex, setEndIndex] = useState<number>();
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [searchBatch, setSearchBatch] = useState<string>("");
  const [searchDate, setSearchDate] = useState<string>("");
  const [category, setCategory] = useState([]);
  const location = useLocation();
  const userId: number = userDetails?.user?.id;
  const token: string = userDetails?.token;
  const toast = useToast();
  const itemsPerPage = 9;
  // -------------taking current date and time for validation --------------
  let currDateTime = new Date();
  let dateString = currDateTime.toLocaleDateString();
  let dateArray = dateString.split("/").map(Number); // [5, 19, 2023]
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
        const dateFormat = moment(searchDate).format("DD-MM-yyyy")
        // ;YYY-MM-DD
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

  console.log("get interview", interviews);

  useEffect(() => {
    if (interviews?.length === 0) {
      GetAllScheduledInterView(userId, token)(dispatch);
      console.log("hi am useEffect");
    }
    
    if (interviews.length > 0) {
      setFilteredItem(interviews);
      setAllData(interviews);
      console.log("filtered", filteredItem);
    }
    // if (searchTerm == "") {
    //   setFilteredItem(interviews);
    // }
  }, [dispatch, interviews.length]);

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
  }, [
    // setSearchTitle,
    // setSearchCategory,
    // setSearchBatch,
    // setSearchDate,
    currentPage,
    updateSearch,
    search,
    // searchTitle,
    // searchCategory,
    // searchBatch,
    // searchDate,
    location.search,
  ]);

 const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    // setSearchTerm(event.target.value);
    // console.log("searchTerm", searchTerm);
    // if (searchTerm) {
    //   const temp = interviews.filter((item: interview) =>
    //     item.title.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    //   console.log("temp", temp);
    //   temp.length > 0 && setFilteredItem(temp);
    //   setPaginatedInterviewsData(filteredItem);
    //   setTotalPages(Math.ceil(filteredItem?.length / itemsPerPage));
    // }
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
      {/* <Navbar /> */}
      <UserNavbar title={"Upcoming Events"} buttonName={"+ Book 1-1"}  />
      <Header title={"Upcoming Events"} buttonName={""} />
      <br />
      <main>

        <Box w={['95%','90%','85%']} bg={"#f1f5f9"} margin={"auto"}>
          <Box h={"auto"} w={['100%']} margin={"auto"} pt={"150px"}>
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
                  Title
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
                    min={`${year}-${month}-${date}`}
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
              w={['95%']}
              h={"auto"}
              m={"auto"}
              mt={"5px"}
              pl={"20px"}
              pr={"20px"}
              pt={"30px"}
              pb={"30px"}
             
            >
              {/* grid layout of scheduled interview */}

              <Grid templateColumns={["repeat(1,1fr)","repeat(2,1fr)","repeat(3,1fr)"]} gap={6}>
                {PaginatedInterviewsData.length != 0 &&

                  PaginatedInterviewsData.map((item) => {
                    return (
                      <GridItem
                        key={item.interviewId}
                        w={"100%"}
                        h={"auto"}
                        border={" 1px solid #bdc4c39a"}
                        bg={"white"}
                        cursor={"pointer"}
        p="15px"
        boxShadow="0 5px 15px rgba(0,0,0,0.06)"
        borderRadius="9px"
        letterSpacing={0.1}
        fontWeight={400}
                      >
                        {/* <Box></Box> */}
                        <Box>
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Box w={"100%"}
                            >
                              <Text
                                fontSize={"18px"}
                                fontWeight={"600"}
                                ml={"15px"}
                                mt={"10px"}
                                color={"#000000ce"}
                                // maxW={"200px"}
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
                              fontWeight={500}
                            >
                              <Box >
                                
                                <Text 
                                color={"#727a7ad5"}

                                >Date</Text>
                                <Text >{item.date}</Text>
                              </Box>
                              <Box>
                                <Text
                                color={"#727a7ad5"}
                                
                                >Start Time</Text>
                                <Text>{convertTimeFormat(item.startTime)}</Text>
                              </Box>
                            </Flex>
                            <Divider orientation="horizontal" mt={"10px"} />
                            <Flex
                              justifyContent={"space-between"}
                              mt={"10px"}
                              pr={"15px"}
                              pl={"15px"}
                            >
                              <Text >{item.interviewerName}</Text>
                              <Text 
                              color={"#166534"}
                              bg={"#DCFCE7"} borderRadius={5} pr={5} pl={5}>{item.category}</Text>
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
                                  View Details &gt;
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
            w={"90%"}
            m={"auto"}
            h={"100px"}
          >
            <Text ml="30px">
              Showing {startIndex} to {endIndex} of {filteredItem?.length}{" "}
              results
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

export default UserDashboard;

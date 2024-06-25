import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/CommonComponents/Header";
import { Box, Button, Center, Flex, Image, Select, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Dispatch } from "redux";
import {
  categoryDataFailure,
  categoryDataLoading,
  categoryDataSuccess,
} from "../../Redux/CategoryReducer/Action";
import { getAllCategoryDataService } from "../../Services/UserSideServices/GetCategoryServices/GetCategoryService";
import {
  adminListByCategoryFailure,
  adminListByCategoryLoading,
  adminListByCategorySuccess,
} from "@/Redux/AdminListByCategoryReducer/Action";
import { getAlladminListByCategoryService } from "../../Services/UserSideServices/GetAllAdminListByCategoryServices/GetAdminListByCategoryService";
import UserNavbar from "../../Components/Navbar/UserNavbar";
let title: string;
let buttonName: string;

const BookOneOnOne = () => {
  const [categoryType, setCategoryType] = useState("");
  const categories = useSelector(
    (state: RootState) => state.CategoryReducer.categories
  );
  const admins = useSelector(
    (state: RootState) => state.AdminListByCategoryReducer.admins
  );
  const isError = useSelector(
    (state: RootState) => state.AdminListByCategoryReducer.isError
  );
  // console.log(Object.keys(admins),"sonin")
  console.log(admins,"admisn")

  const categoryDispatch: Dispatch<
    categoryDataSuccess | categoryDataLoading | categoryDataFailure
  > = useDispatch();

  const adminListDispatch: Dispatch<
    | adminListByCategorySuccess
    | adminListByCategoryFailure
    | adminListByCategoryLoading
  > = useDispatch();

  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const userId: number = userDetails?.user?.id;
  const token: string = userDetails.token;

  useEffect(() => {
    getAllCategoryDataService(token)(categoryDispatch);
  }, []);

  useEffect(() => {
    if (categoryType && admins?.length === 0) {
      getAlladminListByCategoryService(categoryType, token)(adminListDispatch);
      setCategoryType("");

    }
  }, [categoryType, adminListDispatch, admins.length]);

  const handleChangeCategoryType = (e: string) => {
    getAlladminListByCategoryService(e, token)(adminListDispatch);
  };
  return (
    <div>
      {/* {/* <Navbar /> */}
      <UserNavbar title={"Availabilities"} buttonName={"+ Book 1-1"}  />
      <Header title={"Availabilities"} buttonName={"Back"} />
      <br/>
      <main>
        <Box
          w={"100%"}
          h={"100vh"}
          mt="130px"
          bg={"#f1f5f9"}
          border={"1px solid #f1f1f1 "}
        >
          <Box
            w={"75%"}
            h={"auto"}
            m={"auto"}
            mt={"50px"}
            bg={"white"}
            p={"50px"}
            borderRadius={"10px"}
          >
            <Flex justifyContent={"space-between"}>
              <Box w={"30%"}>
                <Select

                  w={"100%"}
                  onChange={(e) => handleChangeCategoryType(e.target.value)}
                >
                  <option value="">select category</option>
                  {categories.length > 0 &&
                    categories.map((item: string, index: number) => {
                      return (
                        <option
                          key={index}
                          onClick={() => setCategoryType(item)}
                          value={item}
                        >
                          {item}
                        </option>
                      );
                    })}
                </Select>
              </Box>
              <Box w={"65%"} textAlign={"center"}>
                <Text
                  p={"6px"}
                  border={"1px solid indigo"}
                  borderRadius={"8px"}
                  width={"150px"}
                  align={"center"}
                  m={"auto"}
                >
                  Admin List
                </Text>
                {Object.keys(admins).length > 0 &&
                  admins.Instructors.map((item: any, index: number) => {
                    console.log("item", item);
                    return (
                      <Link to={`/book-one-on-one/${item.id}`} key={item.id}>
                        <Button colorScheme="blue" mt={"10px"} ml={"5px"}>
                          {item.name}
                        </Button>
                      </Link>
                    );
                  })}
                  
              </Box>
            </Flex>
        
{
  isError && <Box m={"auto"}>
  <Image
   w="40%"
   h="250px"
   mt="3%" ml="30%"
   src={
     "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=2000"
   }
 />
 <Center>
 <Text fontSize="20px" m="auto" mt="20px" >
 Sorry! No Slots Available, Please try again later
 </Text></Center>
</Box>
}
          </Box>

        </Box>
      </main>
    </div>
  );
};

export default BookOneOnOne;

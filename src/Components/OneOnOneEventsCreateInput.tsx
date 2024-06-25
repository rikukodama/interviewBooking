import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  Input,
  Select,
  Text,
  Textarea,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Duration } from "../Assets/Assets";
import { GetCategoryService } from "../Services/AdminSideServices/GetEventsService";

//yup validation schema
const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("This feild is required")
    .min(3, "Name must be 3 character"),
  meetingLink: yup.string().required("This feild is required"),
  duration: yup.string().required("This feild is required")
});

const OneOnOneEventsCreateInput = ({
  EventValues,
  setEventValues,
  addEvent,
  SaveEvent,
  buttonName,
}: any) => {
  //setting initial values for formik and yup

const [category,setCategory] = useState([])
const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
const id = userDetails?.user?.id;
const token = userDetails?.token;
const toast = useToast()

const GetCategory =useCallback(async()=>{
  try {
    const response = await GetCategoryService( token); 
   
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
}, [toast,token]);




   useEffect(()=>{
  GetCategory()
   },[GetCategory])

  const initialValues = {
    title: EventValues.title,
    instruction: EventValues.instruction,
    meetingLink: EventValues.meetingLink,
    duration: EventValues.duration,
    category: EventValues.category,
    adminId: EventValues.adminId,
    startTime: EventValues.startTime,
    endTime: EventValues.endTime,
  };

  const onSubmit = async () => {
    if (buttonName === "Next") {
      addEvent();
    } else {
      SaveEvent();
    }
  };

  //using formik we can set values onSubmit and onChange
  const { handleSubmit, handleBlur, touched, handleChange, values, errors } =
    useFormik({
      onSubmit,
      initialValues,
      validationSchema,
    });

  const setCancel = () => {
    setEventValues("");
  };

  useEffect(() => {
    setEventValues({ ...values });
  }, [values, setEventValues]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <Box>
            <FormLabel mt="10px" color="rgb(75 85 99)">
              Event name{" "}
            </FormLabel>

            <Input
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Event Name"
            />

            {touched.title && errors.title && (
              <Text color="red">
                {JSON.stringify(errors.title).replace(/"/g, "")}
              </Text>
            )}
          </Box>

          <Box>
            <FormLabel mt="10px" color="rgb(75 85 99)">
              MeetingLink{" "}
            </FormLabel>

            <Input
              name="meetingLink"
              value={values.meetingLink}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="meetingLink"
            />

            {touched.meetingLink && errors.meetingLink && (
              <Text color="red">
                {JSON.stringify(errors.meetingLink).replace(/"/g, "")}
              </Text>
            )}
          </Box>
          <Box>
            <FormLabel mt="10px" color="rgb(75 85 99)">
              Duration
            </FormLabel>
            <Select
              value={values.duration}
              onChange={handleChange}
              name="duration"
              placeholder="Duration"
            >
              {Duration.map((e)=>(
              <option key={e} value={e}>
                {e} mins
              </option>))}
              
            </Select>
            {touched.duration && errors.duration && (
              <Text color="red">
                {JSON.stringify(errors.duration).replace(/"/g, "")}
              </Text>
            )}
          </Box>
          <Box>
            <FormLabel mt="10px" color="rgb(75 85 99)">
             Category
            </FormLabel>
            <Select
              value={values.category}
              onChange={handleChange}
              name="category"
              placeholder="category"
            >
              {category?.map((e)=>(
              <option key={e} value={e}>
                {e} 
              </option>))}
              
            </Select>
            {touched.category && errors.category && (
              <Text color="red">
                {JSON.stringify(errors.category).replace(/"/g, "")}
              </Text>
            )}
          </Box>
         
          <Box>
            <FormLabel mt="10px" color="rgb(75 85 99)">
              Instructions
            </FormLabel>
            <Textarea
              name="instruction"
              value={values.instruction}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Instructions"
            />
            {touched.instruction && errors.instruction && (
              <Text color="red">
                {JSON.stringify(errors.instruction).replace(/"/g, "")}
              </Text>
            )}
          </Box>
        </Grid>
        <Flex mt="20px" justifyContent="flex-end">
          <Box>
            <Button variant="link" onClick={setCancel}>
              Cancel
            </Button>
            <Button
              borderRadius="16px"
              colorScheme="blue"
              ml="20px"
              type="submit"
            >
              {buttonName}
            </Button>
          </Box>
        </Flex>
      </form>
    </div>
  );
};

export default OneOnOneEventsCreateInput;

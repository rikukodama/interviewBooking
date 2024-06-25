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
    useToast,
  } from "@chakra-ui/react";
  import React, { useCallback, useEffect, useState } from "react";
  import { useFormik } from "formik";
import { Duration } from "../../Assets/Assets";
import { validationSchema } from "./ValidationSchema";
import TimeslotsInput from "./TimeslotsInput";
import { GetCategoryService } from "../../Services/AdminSideServices/GetEventsService";
import { token} from "../../Assets/Assets";

  
  const OneOffEventInput = ({
    EventValues,
    setEventValues,
    addEvent,
    SaveEvent,
    buttonName,
  }: any) => {

    //setting initial values for formik and yup
    const initialValues = {
      title: EventValues.title,
      instruction: EventValues.instruction,
      meetingLink: EventValues.meetingLink,
      duration: EventValues.duration,
      date: EventValues.date,
      category:EventValues.category,
      adminId: EventValues.adminId
    };
    const [category,setCategory] = useState([])
    
    const toast = useToast()

    const onSubmit = async () => {
      if (buttonName === "Create Slots") {
        addEvent();
      } else {
        SaveEvent();
      }
    };

    let currDateTime = new Date();
    let dateString = currDateTime.toLocaleDateString();
    let dateArray = dateString.split('/').map(Number);

    const setDateTime = (value: any) => {
      if (value < 10) {
          return `0${value}`
      } else {
          return value;
      }
  }


    let month = setDateTime(dateArray[0]);
    let date = setDateTime(dateArray[1]);
    let year = setDateTime(dateArray[2]);


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
    }, [toast]);
    
    
    
    
       useEffect(()=>{
      GetCategory()
       },[GetCategory])

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
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <Box>
              <FormLabel mt="10px" color="rgb(75 85 99)">
                Event name{" "}
              </FormLabel>
  
              <Input
                width="100%"
                minW="40%"
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
                width="100%"
                minW="40%"
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
                 width="100%"
                 minW="40%"
                value={values.duration}
                onChange={handleChange}
                name="duration"
                placeholder="Duration"
              >
               {Duration.map((e)=>(
              <option key={e} value={e}>
                {e} 
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
                Select Date{" "}
              </FormLabel>
  
              <Input
                 width="100%"
                 minW="40%"
                name="date"
                type="date"
                min={`${year}-${month}-${date}`}
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="date"
                 />
            </Box>
            <Box>
              <FormLabel mt="10px" color="rgb(75 85 99)">
                Instructions
              </FormLabel>
              <Textarea
                 width="100%"
                 minW="40%"
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
          
            <Box  minW="40%"  width="100%">
            <FormLabel mt="10px" color="rgb(75 85 99)">
              Add Availability  {" "}
              </FormLabel>

             
              <TimeslotsInput
                values={values}
                EventValues={EventValues}
                setEventValues={setEventValues}
              />
            
              
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
  
  export default OneOffEventInput;
  
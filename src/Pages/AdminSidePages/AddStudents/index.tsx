import Navbar from "../../../Components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import DashboardNavbar from "../AdminDashBoard/DashboardNavbar";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import BulkStudentsUpload from "./BulkStudentsUpload";
import { useFormik } from "formik";
import * as yup from "yup";
import { IAddStdents } from "../../../Services/AdminSideServices/GetEventsInterface";
import { AddStudentService } from "../../../Services/AdminSideServices/GetEventsService";
import { token} from "../../../Assets/Assets";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("This feild is required")
    .min(3, "Name must be 3 character"),
  email: yup.string().required("This feild is required"),
  password: yup.string().required("This feild is required"),
});

const AddStudents = () => {
  const [isSmallerThan600] = useMediaQuery("(max-width: 1000px)");
  const [isSmallerThan800] = useMediaQuery("(max-width: 600px)");
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [studentDetails, setStudentDetails] = useState<IAddStdents>({
    name: "",
    password: "",
    email: ""
   
  });

  //setting initial values for formik and yup
  const initialValues = {
    name: studentDetails.name,
    email: studentDetails.email,
    password: studentDetails.password,
  };

  const onSubmit = async (values:any,{ resetForm }:any) => {
    try {
      const response = await AddStudentService(studentDetails, token);
      if (response.id) {
        setStudentDetails({
          name: "",
          password: "",
          email: "",
          
        })
        resetForm()
        toast({
          title: "Student details added successfully",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }else if(response.status==409){
        toast({
          title: "Email already exists",
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
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

   
    
  };



  //using formik we can set values onSubmit and onChange
  const { handleSubmit, handleBlur, touched, handleChange, values, errors } =
    useFormik({
      onSubmit,
      initialValues,
      validationSchema,
    });

    

  useEffect(() => {
    setStudentDetails({ ...values });
  }, [values, setStudentDetails]);

  return (
    <div className="container">
      <Navbar />
      {/* <DashboardNavbar /> */}
      <br/>
      <Box
        w={['95%','90%','85%']}
        m='auto'
        mt={isSmallerThan800?"3.5cm":'2.4cm'}
        minH="200px"
        h="auto"
        p="2%"
        bg="white"
        borderRadius="10px"
        boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <Stack direction={isSmallerThan600 ? "column" : "row"} spacing={8}>
          <Box
            w={isSmallerThan600 ? "100%" : "70%"}
            p="20px"
            borderRight={isSmallerThan600 ? "" : "1px solid"}
          >
            <FormLabel>Add Student</FormLabel>
            <Divider />
            

            <form onSubmit={handleSubmit}>
              <Box>
                <FormLabel mt="10px" color="rgb(75 85 99)">
                  Student Name{" "}
                </FormLabel>

                <Input
                  width="100%"
                  name="name"
                  placeholder="Student Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              {touched.name && errors.name && (
                  <Text color="red">
                    {JSON.stringify(errors.name).replace(/"/g, "")}
                  </Text>
                )}
              <Box>
                <FormLabel mt="10px" color="rgb(75 85 99)">
                  Email{" "}
                </FormLabel>

                <Input
                  width="100%"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              {touched.email && errors.email && (
                  <Text color="red">
                    {JSON.stringify(errors.email).replace(/"/g, "")}
                  </Text>
                )}
              <Box>
                <FormLabel mt="10px" color="rgb(75 85 99)">
                  Password{" "}
                </FormLabel>
                <InputGroup>
                <Input
                  width="100%"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  value={values.password}
                  onChange={handleChange}
                  
                  minLength={8}
                  onBlur={handleBlur}
                />
                <InputRightElement width="4.5rem"> {/* Width should match padding-right of Input */}
        <IconButton
          h="1.75rem"
          size="sm"
          variant="ghost"
          onClick={handleTogglePassword}
          icon={showPassword ? <FaEyeSlash /> : <FaEye />}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        />
      </InputRightElement>
    </InputGroup>
              </Box>
           

              <Flex mt="20px" justifyContent="flex-end">
                <Button
                  type="submit"
                  colorScheme="blue"
                  m={'auto'}
                  width={'100%'}
                  _hover={{ cursor: "pointer" }}
                >
                  Add Student
                </Button>
              </Flex>
            </form>
          </Box>
          <BulkStudentsUpload />
        </Stack>
      </Box>
    </div>
  );
};

export default AddStudents;

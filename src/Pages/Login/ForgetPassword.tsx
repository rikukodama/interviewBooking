import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginService, resetPassword, verifyPassword } from "../../Services/AuthService";
import { Dispatch } from "redux";
import {
  Action,
  isLoginFailure,
  isLoginSuccess,
} from "../../Redux/AuthReducer/Action";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Checkbox,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { ActionTypes } from "../../Redux/AuthReducer/ActionTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { PinComponent } from "../../Components/PinOTP/Pin";
// commented code i will use latter
// const SignupSchema = Yup.object().shape({
//   username: Yup.string().email("Invalid email").required(""),
//   password: Yup.string().required("Password is required"),

//   //    password:  Yup
//   //    .string()
//   //    .required("Password is required")
//   //    .min(8, "Password must be 8 characters long")
//   //    .matches(/[0-9]/, "Password requires a number")
//   //    .matches(/[A-Z]/, "Password requires a uppercase letter")
//   //    .matches(/[a-z]/, "Password requires a lowercase letter")
//   //    .matches(/[^\w]/, "Password requires a symbol"),
// });
export interface resetPasswordEmail {
  username: string;
  //   password: string;
}

export const ForgetPassword = () => {
  const dispatch: any = useDispatch();
  const inpRef = useRef<Array<string | number>>([]);
  const toast = useToast();
  const navigate = useNavigate();


  // const showOTPButton = useRef(false);
  const [showOTPButton,setshowOTPButton] = useState<boolean>(false)

  //   const commingFrom = location?.state?.from?.pathname || "/dashboard";
  // -------------------------
  const [InputEmailValue, setEmailValue] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetPassword(InputEmailValue)(dispatch).then((res) => {
      // showOTPButton.current = true;
      setshowOTPButton(true);
      toast({
        title: "OTP has been sent to your email",
        description: "",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    
    }).catch((err) => {
      setshowOTPButton(true);
      toast({
        title: "OTP has been sent to your email",
        description: "",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    })
  }

  const handlePinComplete = ({ otp, newPassword }: {
    otp: string | number;
    newPassword: string | number;
  }) => {
    console.log("PIN entered:", otp);
    const payload = {
      "email": InputEmailValue,
      "otp": otp,
      "newPassword" : newPassword
    }

    verifyPassword(payload)(dispatch).then((res)=>{
console.log("pinres",res)
toast({
  title: "Password Updated Successfully",
  description: "your password has been changed. please login to proceed",
  status: "success",
  position: "top",
  duration: 4000,
  isClosable: true,
});
      navigate("/login");
      console.log("below navigate")
      
      
    }).catch((err)=>{
      toast({
        title: "Incorrect OTP",
        description: "Please insert correct OTP",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    })
  };

  return (
    <Box  w={"full"} bg={"#FAFAFA"} m="auto" h={"100vh"} p={"100px"}>
        <Box m={"auto"} mt={"-1px"} mb={"-1px"}>
          <Image m={"auto"} w={"250px"}  src="https://masaischool.com/img/navbar/logo.svg" alt="masai logo" />
        </Box>
      <form onSubmit={handleSubmit}>
        <Box
          w={"30%"}
          m={"auto"}
          
          // h={"300px"}
          display={"flex"}
          flexDirection={"column"}
          bg={"white"}
          gap={"15px"}
          borderRadius={"10px"}
          p={"20px"}
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
        >
          {!showOTPButton && (
         <Box mt={"20px"}>
           <Text color={"grey"}>Email</Text>
                    <Input   type="email" mt={"5px"} value={InputEmailValue} onChange={(e) => setEmailValue(e.target.value)} placeholder="enter your email"  isRequired />
          </Box> 
         )}
          {/* ----------PIN OTP---------- */}


         { showOTPButton &&  <PinComponent onComplete={handlePinComplete}/>}







          {!showOTPButton && <Button
            type="submit"
            w={"100%"}
            variant={"solid"}
            bg={"black"}
            color={"white"}
            mt={"20px"}
            mb={"20px"}
          >
            Send OTP
          </Button>}
          
        </Box>
      </form>



    </Box>
  );
};

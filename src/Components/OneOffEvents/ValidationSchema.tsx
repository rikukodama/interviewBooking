
import * as yup from "yup";


  export const validationSchema = yup.object().shape({
 
    title: yup
    .string()
    .required("This feild is required")
    .min(3, "Name must be 3 character"),
  meetingLink: yup.string().required("This feild is required"),
  duration: yup.string().required("This feild is required"),
  date: yup.string().required("This feild is required"),
    
  });
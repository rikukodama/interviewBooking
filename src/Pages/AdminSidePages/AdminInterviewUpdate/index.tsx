import Navbar from '../../../Components/Navbar/Navbar'
import React, { useEffect } from 'react'
import { Box, Button, FormLabel, Input, Select, Textarea, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { createSingleInterview } from '../../../Redux/ScheduleInterviewAdmin/ActionCreators'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getAllCategoryDataService } from '../../../Services/UserSideServices/GetCategoryServices/GetCategoryService'
import { RootState } from '../../../Redux/store'
import InterviewUpdateNav from './InterviewUpdateNav'
import { updateSingleInterview } from "../../../Redux/UpdateSingleInterviewReducer/ActionCreators";

const validationSchema = yup.object().shape({
    interviewer: yup
        .string()
        .required("Interviewer e-mail address is required")
        .email("Enter a valid e-mail address"),
    interviewee: yup
        .string()
        .required("Interviewee e-mail address is required")
        .email("Enter a valid e-mail address"),
    start: yup
        .string()
        .required("Start date time is required"),
    end: yup
        .string()
        .required("End date time is required"),
    date: yup
        .string()
        .required("Date is required"),
    category: yup
        .string()
        .required("Category is required"),
    instruction: yup
        .string()
        .required("Instructions are required"),
    title: yup
        .string()
        .required("Title is required"),
    zoomlink: yup
        .string().required("zoom Link is required")
        .matches(/^https:\/\/[a-z0-9-]+\.zoom\.us\/j\/\d{10,}$/, "Please enter a valid zoom link"),
    batch: yup
        .string()
        .required("Batch is required")
})

export interface MyFormValues {
    interviewer: string,
    interviewee: string,
    start: string,
    end: string,
    date: string,
    category: string,
    instruction: string,
    title: string,
    zoomlink: string,
    batch: string
}

export const UpdateSingleInterview = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate()
    const { state } = useLocation();
    const data = state.data;
    const { id } = useParams();
    console.log(data);
    const token = useSelector((state: RootState) => state.AuthReducer.token);
    const category = useSelector((state: RootState) => state.CategoryReducer.categories);

    // formating the start time to update in the form 
    const startTime = data.startTime.split(":").slice(0, 2).join(":");

    // formating the end time to update in the form 
    const endTime = data.endTime.split(":").slice(0, 2).join(":");

    // formating the date to update in the form 
    const [idate, imonth, iyear] = data.date.split("-")

    category.map((e: string) => {
        if (data.category === e) {
            data.category = e
        }
    })

    const initialValues: MyFormValues = {
        interviewer: data.interviewerEmail,
        interviewee: data.intervieweeEmail,
        start: startTime,
        end: endTime,
        date: `${iyear}-${imonth}-${idate}`,
        category: data.category,
        instruction: data.instructions,
        title: data.title,
        zoomlink: data.meetingLink,
        batch: data.batch
    }

    useEffect(() => {
        getAllCategoryDataService(token)(dispatch);
    }, []);

    // -------------takinc current date and time for validation --------------
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

    const onSubmit = (values: MyFormValues) => {
        const startTime = values.start + ":00";
        const endTime = values.end + ":00";
        // Accessing the date to change the date formate

        const initialDate = values.date.split("-");
        const [year, month, date] = initialDate;
        const data = {
            "interviewerEmail": values.interviewer,
            "intervieweeEmail": values.interviewee,
            "startTime": startTime,
            "endTime": endTime,
            "date": `${date}-${month}-${year}`,
            "category": values.category,
            "instructions": values.instruction,
            "title": values.title,
            "meetingLink": values.zoomlink,
            "batch": values.batch
        }
        console.log(data);
        updateSingleInterview(id, data, token)(dispatch).then((res: any) => {
            if (res.status == 200) {
                toast({
                    title: "Interview Updated Successfully",
                    status: "success",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });
                navigate(-1);
            }
        }).catch((err) => {
            toast({
                title: "Something Went Wrong",
                status: "error",
                position: "top",
                duration: 2000,
                isClosable: true,
            });
        })
    };

    let month = setDateTime(dateArray[0]);
    let date = setDateTime(dateArray[1]);
    let year = setDateTime(dateArray[2]);

    const { handleSubmit, handleBlur, touched, handleChange, values, errors } = useFormik({
        onSubmit,
        initialValues,
        validationSchema,
    })

    return (
        <div className="container">
            <Navbar />
            <InterviewUpdateNav />
            <br/>
            <Box w="80%" ml="10%" mt="130px" minH="200px" h="auto" p="5%" bg="white" borderRadius="10px" boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)">
                <Box borderRadius={"10px"} justifyContent={'center'} boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" width={"100%"} p="20px">
                    <form onSubmit={handleSubmit}>
                        <div className='formMainDiv'>
                            <div className='title'>
                                <FormLabel mt="10px" color="rgb(75 85 99)">
                                    Title
                                </FormLabel>
                                <Input
                                    name="title"
                                    placeholder="Enter Title"
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.title && errors.title && <p style={{ "color": "red" }}>{errors.title}</p>}
                            </div>
                            <div>
                                <FormLabel mt="10px" color="rgb(75 85 99)">Interviewer Email</FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type='email'
                                    name="interviewer"
                                    placeholder="Enter Interviewer e-mail address"
                                    value={values.interviewer}
                                />
                                {touched.interviewer && errors.interviewer && <p style={{ "color": "red" }}>{errors.interviewer}</p>}
                            </div>
                            <div>
                                <FormLabel mt="10px" color="rgb(75 85 99)">
                                    Interviewee Email
                                </FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type='email'
                                    name="interviewee"
                                    placeholder="Enter Interviewer e-mail address"
                                    value={values.interviewee}
                                />
                                {touched.interviewee && errors.interviewee && <p style={{ "color": "red" }}>{errors.interviewee}</p>}
                            </div>
                            <div>
                                <FormLabel mt="10px" color="rgb(75 85 99)">
                                    Start Time
                                </FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="start"
                                    type='time'
                                    value={values.start}
                                />
                                {touched.start && errors.start && <p style={{ "color": "red" }}>{errors.start}</p>}
                            </div>
                            <div>
                                <FormLabel mt="10px" color="rgb(75 85 99)">
                                    End Time
                                </FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="end"
                                    type='time'
                                    value={values.end}
                                />
                                {touched.end && errors.end && <p style={{ "color": "red" }}>{errors.end}</p>}
                            </div>
                            <div>
                                <FormLabel mt="10px" color="rgb(75 85 99)">
                                    Date
                                </FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="date"
                                    type='date'
                                    min={`${year}-${month}-${date}`}
                                    value={values.date}
                                />
                                {touched.date && errors.date && <p style={{ "color": "red" }}>{errors.date}</p>}
                            </div>
                            <div>
                                <FormLabel mt="10px" color="rgb(75 85 99)">
                                    Category
                                </FormLabel>
                                <Select
                                    name='category'
                                    onChange={handleChange}
                                    value={values.category}
                                >
                                    <option value="">Category</option>
                                    {
                                        category.map((e: string) => {
                                            return <option value={e}>{e}</option>
                                        })
                                    }
                                </Select>
                                {touched.category && errors.category && <p style={{ "color": "red" }}>{errors.category}</p>}
                            </div>
                            <div>
                                <FormLabel mt="10px" color="rgb(75 85 99)">
                                    Batch
                                </FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name='batch'
                                    type='text'
                                    value={values.batch}
                                />
                                {touched.batch && errors.batch && <p style={{ "color": "red" }}>{errors.batch}</p>}
                            </div>
                            <div>
                                <FormLabel mt="10px" color="rgb(75 85 99)">
                                    Zoom Link
                                </FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="zoomlink"
                                    placeholder="Enter Zoomlink "
                                    value={values.zoomlink}
                                />
                                {touched.zoomlink && errors.zoomlink && <p style={{ "color": "red" }}>{errors.zoomlink}</p>}
                            </div>
                            <div className='instruction'>
                                <FormLabel mt="10px" color="rgb(75 85 99)">
                                    Instructions
                                </FormLabel>
                                <Textarea
                                    name="instruction"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.instruction}
                                />
                                {touched.instruction && errors.instruction && <p style={{ "color": "red" }}>{errors.instruction}</p>}
                            </div>
                        </div>
                        <div className='submitButton'>
                            <Button type='submit' colorScheme='blue' mt="10px">Update Interview</Button>
                        </div>
                    </form>
                </Box>
            </Box>
        </div >
    )
}

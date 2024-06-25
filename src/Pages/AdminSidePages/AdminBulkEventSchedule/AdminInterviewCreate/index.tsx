import Navbar from '../../../../Components/Navbar/Navbar'
import React, { useEffect } from 'react'
import InterviewCreateNav from './InterviewCreateNav'
import { Box, Button, FormLabel, Input, Select, Textarea, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from "yup";
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { createSingleInterview } from '../../../../Redux/ScheduleInterviewAdmin/ActionCreators'
import { useNavigate } from 'react-router-dom'
import { getAllCategoryDataService } from '../../../../Services/UserSideServices/GetCategoryServices/GetCategoryService'
import { RootState } from '../../../../Redux/store'


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
    "interviewer": string,
    "interviewee": string,
    "start": string,
    "end": string,
    "date": string,
    "category": string,
    "instruction": string,
    "title": string,
    "zoomlink": string,
    "batch": string
}

const initialValues: MyFormValues = {
    "interviewer": "",
    "interviewee": "",
    "start": "",
    "end": "",
    "date": "",
    "category": "",
    "instruction": "",
    "title": "",
    "zoomlink": "",
    "batch": ""
}

export const CreateSingleInterview = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.AuthReducer.token);
    const category = useSelector((state: RootState) => state.CategoryReducer.categories);
    console.log(category);

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
        createSingleInterview(data, token)(dispatch).then((res: any) => {
            if (res.status == 201) {
                toast({
                    title: "Interview Schduled success",
                    status: "success",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });
                navigate("/admin/dashboard");
            } else {
                toast({
                    title: "Something Went Wrong",
                    status: "error",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });
            }
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
            <InterviewCreateNav />
            <br/>
            {/* <Box w={['95%','95%','90%']} m={'auto'} minH="200px" h="auto" p="5%" bg="white" borderRadius="10px" boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)"> */}
                <Box  bg="white" w={['95%','95%','85%']} m={'auto'} borderRadius={"15px"} justifyContent={'center'} boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" width={"100%"} p="25px">
                    <form onSubmit={handleSubmit}>
                        <div className='formMainDiv'>
                            <div className='title'>
                                <FormLabel fontSize={['12px','14px','16px']} mt="10px" color="rgb(75 85 99)">
                                    Title
                                </FormLabel>
                                <Input
                                    name="title"
                                    placeholder="Enter Title"
                                    value={values.title}
                                    fontSize={'13px'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.title && errors.title && <p style={{ "color": "red" }}>{errors.title}</p>}
                            </div>
                            <div>
                                <FormLabel fontSize={['12px','14px','16px']} mt="10px" color="rgb(75 85 99)">Interviewer Email</FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fontSize={'13px'}
                                    type='email'
                                    name="interviewer"
                                    placeholder="Enter Interviewer e-mail address"
                                    value={values.interviewer}
                                />
                                {touched.interviewer &&  errors.interviewer && <p style={{ "color": "red" }}>{errors.interviewer}</p>}
                            </div>
                            <div>
                                <FormLabel fontSize={['12px','14px','16px']} mt="10px" color="rgb(75 85 99)">
                                    Interviewee Email
                                </FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fontSize={'13px'}
                                    type='email'
                                    name="interviewee"
                                    placeholder="Enter Interviewer e-mail address"
                                    value={values.interviewee}
                                />
                                {touched.interviewee &&  errors.interviewee && <p style={{ "color": "red" }}>{errors.interviewee}</p>}
                            </div>
                            <div>
                                <FormLabel fontSize={['12px','14px','16px']} mt="10px" color="rgb(75 85 99)">
                                    Start Time
                                </FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fontSize={'13px'}
                                    name="start"
                                    type='time'
                                    value={values.start}
                                />
                                {touched.start &&  errors.start && <p style={{ "color": "red" }}>{errors.start}</p>}
                            </div>
                            <div>
                                <FormLabel fontSize={['12px','14px','16px']} mt="10px" color="rgb(75 85 99)">
                                    End Time
                                </FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fontSize={'13px'}
                                    name="end"
                                    type='time'
                                    value={values.end}
                                />
                                {touched.end &&  errors.end && <p style={{ "color": "red" }}>{errors.end}</p>}
                            </div>
                            <div>
                                <FormLabel fontSize={['12px','14px','16px']} mt="10px" color="rgb(75 85 99)">
                                    Date
                                </FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fontSize={'13px'}
                                    name="date"
                                    type='date'
                                    min={`${year}-${month}-${date}`}
                                    value={values.date}
                                />
                                { touched.date && errors.date && <p style={{ "color": "red" }}>{errors.date}</p>}
                            </div>
                            <div>
                                <FormLabel fontSize={['12px','14px','16px']} mt="10px" color="rgb(75 85 99)">
                                    Category
                                </FormLabel>
                                <Select
                                    name='category'
                                    onChange={handleChange}
                                    fontSize={'13px'}
                                    value={values.category}
                                >
                                    <option value="">Category</option>
                                    {
                                        category.map((e: string) => {
                                            return <option value={e}>{e}</option>
                                        })
                                    }
                                </Select>
                                {touched.category &&  errors.category && <p style={{ "color": "red" }}>{errors.category}</p>}
                            </div>
                            <div>
                                <FormLabel fontSize={['12px','14px','16px']} mt="10px" color="rgb(75 85 99)">
                                    Batch
                                </FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fontSize={'13px'}
                                    placeholder='Enter the Batch'
                                    name='batch'
                                    type='text'
                                    value={values.batch}
                                />
                                {touched.batch &&  errors.batch && <p style={{ "color": "red" }}>{errors.batch}</p>}
                            </div>
                            <div>
                                <FormLabel fontSize={['12px','14px','16px']} mt="10px" color="rgb(75 85 99)">
                                    Zoom Link
                                </FormLabel>
                                <Input
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="zoomlink"
                                    placeholder="Enter Zoomlink "
                                    fontSize={'13px'}
                                    value={values.zoomlink}
                                />
                                {touched.zoomlink && errors.zoomlink && <p style={{ "color": "red" }}>{errors.zoomlink}</p>}
                            </div>
                            <div className='instruction'>
                                <FormLabel fontSize={['12px','14px','16px']} mt="10px" color="rgb(75 85 99)">
                                    Instructions
                                </FormLabel>
                                <Textarea
                                    name="instruction"
                                    fontSize={'13px'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.instruction}
                                />
                                {touched.instruction && errors.instruction && <p style={{ "color": "red" }}>{errors.instruction}</p>}
                            </div>
                        </div>
                        <div className='submitButton'>
                            <Button w={'90%'} type='submit' colorScheme='blue' mt="20px" mb={'20px'}>Schedule Interview</Button>
                        </div>
                    </form>
                </Box>
            {/* </Box> */}
        </div >
    )
}

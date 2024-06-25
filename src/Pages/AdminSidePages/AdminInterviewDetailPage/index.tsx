import Navbar from "../../../Components/Navbar/Navbar";
import React, { useEffect,useState} from "react";
import DetailPageNav from "./InterviewDetailPageNav";
import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SkeletonCircle, SkeletonText, Switch, Table, Tbody, Td, Text, Textarea, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleInterview } from "../../../Redux/InterviewByIdReducer/ActionCreators";
import { RootState } from "../../../Redux/store";
import { convertTimeFormat } from "../../../utils/index";
import { updateMeetingEndedStatusService, updateMeetingStartStatusService } from "../../../Services/UserSideServices/UpdateMeetingStatusService/updateMeetingStatus";
import { postAdminFeedback } from "../../../Services/PostAdminFeedbackService/PostAdminFeedbackService";

const AdminInterviewDetailPage = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const { id } = useParams<string>();
    const token = useSelector((state: RootState) => state.AuthReducer.token)
    const user = useSelector((state: RootState) => state.AuthReducer.user)
    const userId = user.id;
    const interview = useSelector((state: RootState) => state.SingleInterviewReducer.interview);
    const isLoading = useSelector((state: RootState) => state.SingleInterviewReducer.isLoading);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [startTimeStatus, setStartTimeStatus] = useState(false);
    const [joinButtonStatus, setJoinButtonStatus] = useState(false);
    const [updateCancelButtonStatus, setUpdateCancelButtonStatus] = useState(false);
    const [feedbackButtonStatus, setFeedbackButtonStatus] = useState(false);
    const [endButtonStatus, setEndButtonStatus] = useState(false);
    const [feedback, setFeedback] = useState("");

    // dispatching the function to get the interview-detail
    useEffect(() => {
        getSingleInterview(id, token)(dispatch);
    }, [])

    // getting the current time in milisecond
    const time = Date.now();

    // getting date time to convert it in milisecond
    const date = interview.date
    const startTime = interview.startTime
    const endTime = interview.endTime

    // combining the date and time to convert it in milisecond for comparision
    const starttime = `${date} ${startTime}`;
    const endtime = `${date} ${endTime}`

    // function to convert the start and end time into milisecond
    function convertToMilliseconds(dateTimeString: string) {
        const [date, time] = dateTimeString.split(" ");
        const [day, month, year] = date.split("-");
        const [hours, minutes, seconds] = time.split(":");
        const milliseconds = Date.parse(`${month}-${day}-${year} ${hours}:${minutes}:${seconds}`);
        return milliseconds;
    }

    // converting the start and end time into milisecond
    const miliStart = convertToMilliseconds(starttime);
    const miliEnd = convertToMilliseconds(endtime);

    // when to show the start button =>{startTime-5min <= currTime && meetingStatus==="P" && currTime < EndTime}
    useEffect(() => {
        if (((miliStart) <= time) && (interview.meetingStatus === "P" || interview.meetingStatus === "SS") && (time < miliEnd)) {
            setStartTimeStatus(true);
        }
    }, [interview, time, miliStart, miliEnd]);

    // when to show the update and cancel button =>{startTime < time || interview.meetingStatus === "C"}
    useEffect(() => {
        // alert("")
        if (((miliStart) > time) && (interview.meetingStatus !== "C")) {
            setUpdateCancelButtonStatus(true);
        } else {
            setUpdateCancelButtonStatus(false);
        }
    }, [interview, time, miliStart, miliEnd])

    // when to show the join meeting button =>{startTime-5min <=currTime && currTime < endTime}
    useEffect(() => {
        if (((miliStart - 300000) <= time) && (time < miliEnd)) {
            setJoinButtonStatus(true);
        }
        if ((interview.meetingStatus === "C")) {
            setJoinButtonStatus(false);
        }
    }, [interview, time, miliStart, miliEnd])

    // when to show add feedback button =>{meetingStatus==="S" || meetingStatus==="IS" || meetingStatus==="SE"}
    useEffect(() => {
        if ((interview.meetingStatus === "S") || (interview.meetingStatus === "IS") || (interview.meetingStatus === "SE")) {
            setFeedbackButtonStatus(true);
            setStartTimeStatus(false);
        }
    }, [interview])

    // when to show end meeting button =>{currTime >= endTime}
    useEffect(() => {
        if ((time >= miliEnd)) {
            setEndButtonStatus(true);
        }
        if ((interview.meetingStatus === "C") || (interview.meetingStatus === "IE") || (interview.meetingStatus === "E") || (interview.meetingStatus === "P")) {
            setEndButtonStatus(false);
            setFeedbackButtonStatus(false);
        }
    }, [interview, time, miliEnd])

    // on starting the meeting 
    const handleStarted = async (
        interviewId: number,
        userId: number,
        token: string
    ) => {
        try {
            if (interviewId && userId) {
                const res = await updateMeetingStartStatusService(
                    interviewId,
                    userId,
                    token
                );
                console.log("jhj", res);
                if (res) {
                    toast({
                        title: "Interview Started",
                        status: "success",
                        position: "top",
                        duration: 2000,
                        isClosable: true,
                    });
                }
                getSingleInterview(id, token)(dispatch);
            }
        } catch (err) {
            if(err){
                toast({
                    title: "Somthing Went Wrong",
                    status: "error",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
    };

    // on ending the meeting
    const handleEnded = async (
        interviewId: number,
        userId: number,
        token: string
    ) => {
        if (!interview.adminFeedback) {
            toast({
                title: "Add Feedback to end the meet",
                status: "error",
                position: "top",
                duration: 2000,
                isClosable: true,
            });
        } else {
            try {
                if (interviewId && userId && token) {
                    const res = await updateMeetingEndedStatusService(
                        interviewId,
                        userId,
                        token
                    );
                    if (res) {
                        toast({
                            title: "Interview Ended",
                            status: "success",
                            position: "top",
                            duration: 2000,
                            isClosable: true,
                        });
                    }
                    getSingleInterview(id, token)(dispatch);
                }
            } catch (err) {
                if (err) {
                    toast({
                        title: "Somthing Went Wrong",
                        status: "error",
                        position: "top",
                        duration: 2000,
                        isClosable: true,
                    });
                }
            }
        }
    };

    // Add feedback in interview
    const handleFeedback = async (
        interviewId: number,
        userId: number,
        token: string,
        notes: string
    ) => {
        try {
            const res = await postAdminFeedback(interviewId, userId, token, notes);
            if (res) {
                toast({
                    title: "Feedback Added",
                    status: "success",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });
            }
            getSingleInterview(id, token)(dispatch);
            onClose()
        } catch (err) {
            if (err) {
                toast({
                    title: "Somthing Went Wrong",
                    status: "error",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <div>
            <Navbar />
            <DetailPageNav interview={interview} id={id} updateCancelButtonStatus={updateCancelButtonStatus} />
            <br/>
            <main>
                <Box bgColor={"#fafafa"} p={"20px"}>
                    <Box
                        w={"75%"}
                        m={"auto"}
                        bg={"white"}
                        mt={"130px"}
                        p={"50px"}
                        borderRadius={"10px"}
                        bgColor={"white"}
                    >
                        {interview && (
                            <Table w={"100%"} variant={"striped"} colorScheme="teal" >
                                <Tbody>
                                    <Tr>
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                        </Td>
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                            Title
                                        </Td>
                                        <Td textAlign={"left"} color={"black"} fontSize={"17px"} fontWeight={"500"}>
                                            {Object.keys(interview).length === 0
                                                ? ""
                                                : interview.title}
                                        </Td>
                                    </Tr>
                                    <Tr >
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                        </Td>
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                            Start Time
                                        </Td>
                                        <Td textAlign={"left"} color={"black"} fontSize={"17px"} fontWeight={"500"}>
                                            {Object.keys(interview).length === 0
                                                ? ""
                                                : convertTimeFormat(interview.startTime)}
                                        </Td>
                                    </Tr>
                                    <Tr >
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                        </Td>
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                            End Time
                                        </Td>
                                        <Td textAlign={"left"} color={"black"} fontSize={"17px"} fontWeight={"500"}>
                                            {Object.keys(interview).length === 0
                                                ? ""
                                                : convertTimeFormat(interview.endTime)}
                                        </Td>
                                    </Tr>
                                    <Tr >
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                        </Td>
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                            Interviewer Name
                                        </Td>
                                        <Td textAlign={"left"} color={"black"} fontSize={"17px"} fontWeight={"500"}>
                                            {Object.keys(interview).length === 0
                                                ? ""
                                                : interview.interviewerName}
                                        </Td>
                                    </Tr>
                                    <Tr >
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                        </Td>
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                            Interviewee Name
                                        </Td>
                                        <Td textAlign={"left"} color={"black"} fontSize={"17px"} fontWeight={"500"}>
                                            {Object.keys(interview).length === 0
                                                ? ""
                                                : interview.intervieweeName}
                                        </Td>
                                    </Tr>
                                    <Tr >
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                        </Td>
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                            Meeting Status
                                        </Td>
                                        <Td textAlign={"left"}>
                                            {Object.keys(interview).length === 0 ? (
                                                ""
                                            ) : interview.meetingStatus == "P" ? (
                                                <Text
                                                    color={"black"}
                                                    fontSize={"17px"}
                                                    fontWeight={"500"}
                                                >
                                                    Pending
                                                </Text>
                                            ) : interview.meetingStatus === "C" ? (
                                                <Text
                                                    color={"black"}
                                                    fontSize={"17px"}
                                                    fontWeight={"500"}
                                                >
                                                    Canceled
                                                </Text>
                                            ) : interview.meetingStatus === "SS" ? (
                                                <Text
                                                    color={"black"}
                                                    fontSize={"17px"}
                                                    fontWeight={"500"}
                                                >
                                                    Started By Student
                                                </Text>
                                            ) : interview.meetingStatus === "SE" ? (
                                                <Text
                                                    color={"black"}
                                                    fontSize={"17px"}
                                                    fontWeight={"500"}
                                                >
                                                    Ended By Student
                                                </Text>
                                            ) : interview.meetingStatus == "IE" ? (
                                                <Text
                                                    color={"black"}
                                                    fontSize={"17px"}
                                                    fontWeight={"500"}
                                                >
                                                    Ended By Interviewer
                                                </Text>
                                            ) : interview.meetingStatus == "IS" ? (
                                                <Text
                                                    color={"black"}
                                                    fontSize={"17px"}
                                                    fontWeight={"500"}
                                                >
                                                    Started By Interviewer
                                                </Text>
                                            ) : interview.meetingStatus == "S" ? (
                                                <Text color={"black"} fontSize={"17px"} fontWeight={"500"}>Started</Text>
                                            ) : interview.meetingStatus == "E" ? (
                                                <Text
                                                    color={"black"}
                                                    fontSize={"17px"}
                                                    fontWeight={"500"}
                                                >
                                                    Ended
                                                </Text>
                                            ) : (
                                                ""
                                            )}
                                        </Td>
                                    </Tr>
                                    {
                                        interview.adminFeedback && <Tr >
                                            <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                            </Td>
                                            <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                                Feedback
                                            </Td>
                                            <Td textAlign={"left"}>
                                                <Text
                                                    color={"black"}
                                                    fontSize={"17px"}
                                                    fontWeight={"500"}>
                                                    {interview.adminFeedback}
                                                </Text>

                                            </Td>
                                        </Tr>
                                    }
                                    <Tr >
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                        </Td>
                                        <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                                            Date
                                        </Td>
                                        <Td textAlign={"left"} color={"black"} fontSize={"17px"} fontWeight={"500"}>
                                            {Object.keys(interview).length === 0
                                                ? ""
                                                : interview.date}
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        )}
                        <Flex justifyContent={"center"} gap={"10px"} marginTop={"20px"}>
                            {
                                startTimeStatus && <Button
                                    onClick={() =>
                                        handleStarted(
                                            interview.interviewId,
                                            userId,
                                            token
                                        )}
                                    colorScheme="blue"
                                >
                                    Start
                                </Button>
                            }
                            {
                                joinButtonStatus && <Link
                                    to={`${Object.keys(interview).length !== 0 &&
                                        interview.meetingLink
                                        }`}
                                    target="_blank"
                                >
                                    <Button
                                        colorScheme="blue"
                                    >
                                        Join Meet
                                    </Button>
                                </Link>
                            }
                            {
                                feedbackButtonStatus && <Box
                                    display={"flex"}
                                    w={"200px"}
                                    textAlign={"left"}
                                >
                                    <Button
                                        onClick={onOpen}
                                        colorScheme="blue"
                                    >
                                        Add Feedback
                                    </Button>
                                    <Modal isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Add Feedback</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Textarea
                                                    onChange={(e) => {
                                                        setFeedback(e.target.value);
                                                    }}
                                                />
                                            </ModalBody>

                                            <ModalFooter >
                                                <Button
                                                    colorScheme="blue"
                                                    mr={3}
                                                    onClick={() =>
                                                        handleFeedback(
                                                            interview.interviewId,
                                                            userId,
                                                            token,
                                                            feedback
                                                        )
                                                    }
                                                >
                                                    Add Feedback
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </Box>
                            }
                            {
                                endButtonStatus && <Button
                                    onClick={() =>
                                        handleEnded(
                                            interview.interviewId,
                                            userId,
                                            token
                                        )
                                    }
                                    colorScheme="blue"
                                >
                                    End
                                </Button>
                            }
                        </Flex>
                    </Box>
                </Box>
            </main>
        </div>
    );
};

export default AdminInterviewDetailPage;

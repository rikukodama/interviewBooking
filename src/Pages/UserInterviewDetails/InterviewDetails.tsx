import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/CommonComponents/Header";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Link } from "react-router-dom";
import { convertTimeFormat } from "../../utils/index";
import { useParams } from "react-router-dom";
import {
  updateMeetingEndedStatusService,
  updateMeetingStartStatusService,
} from "../../Services/UserSideServices/UpdateMeetingStatusService/updateMeetingStatus";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Table, Tbody, Tr, Td } from "@chakra-ui/react";

import { postStudentNotes } from "../../Services/PostStudentNotesService/PostStudentNotesService";
import { getSingleInterview } from "../../Redux/InterviewByIdReducer/ActionCreators";
import UserNavbar from "../../Components/Navbar/UserNavbar";

const InterviewDetails = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { id } = useParams<string>();
  const token = useSelector((state: RootState) => state.AuthReducer.token);
  const user = useSelector((state: RootState) => state.AuthReducer.user);
  const userId = user.id;
  const interview = useSelector(
    (state: RootState) => state.SingleInterviewReducer.interview
  );
  const isLoading = useSelector(
    (state: RootState) => state.SingleInterviewReducer.isLoading
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startTimeStatus, setStartTimeStatus] = useState(false);
  const [joinButtonStatus, setJoinButtonStatus] = useState(false);
  const [notesButtonStatus, setNotesButtonStatus] = useState(false);
  const [endButtonStatus, setEndButtonStatus] = useState(false);
  const [notes, setNotes] = useState<string>("");

  // dispatching the function to get the interview-detail
  useEffect(() => {
    getSingleInterview(id, token)(dispatch);
  }, []);

  // getting the current time in milisecond
  const time = Date.now();
  // console.log(updateCancelButtonStatus, "updateStatus");

  // getting date time to convert it in milisecond
  const date = interview.date;
  const startTime = interview.startTime;
  const endTime = interview.endTime;

  // combining the date and time to convert it in milisecond for comparision
  const starttime = `${date} ${startTime}`;
  const endtime = `${date} ${endTime}`;

  // function to convert the start and end time into milisecond
  function convertToMilliseconds(dateTimeString: string) {
    const [date, time] = dateTimeString.split(" ");
    const [day, month, year] = date.split("-");
    const [hours, minutes, seconds] = time.split(":");
    const milliseconds = Date.parse(
      `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`
    );
    return milliseconds;
  }

  // converting the start and end time into milisecond
  const miliStart = convertToMilliseconds(starttime);
  const miliEnd = convertToMilliseconds(endtime);

  // when to show the start button =>{startTime-5min <= currTime && meetingStatus==="P" && currTime < EndTime}
  useEffect(() => {
    if (
      miliStart <= time &&
      (interview.meetingStatus === "P" || interview.meetingStatus === "IS") &&
      time < miliEnd
    ) {
      setStartTimeStatus(true);
    }
  }, [interview, time, miliStart, miliEnd]);
  // when to show the join meeting button =>{startTime-5min <=currTime && currTime < endTime}
  useEffect(() => {
    if (miliStart - 300000 <= time && time < miliEnd) {
      setJoinButtonStatus(true);
    }
    if (interview.meetingStatus === "C") {
      setJoinButtonStatus(false);
    }
  }, [interview, time, miliStart, miliEnd]);

  // when to show add feedback button =>{meetingStatus==="S" || meetingStatus==="IS" || meetingStatus==="SE"}
  useEffect(() => {
    if (
      interview.meetingStatus === "S" ||
      interview.meetingStatus === "SS" ||
      interview.meetingStatus === "IE"
    ) {
      setNotesButtonStatus(true);
      setStartTimeStatus(false);
    }
  }, [interview]);

  // when to show end meeting button =>{currTime >= endTime}
  useEffect(() => {
    if (time >= miliEnd) {
      setEndButtonStatus(true);
    }
    if (
      interview.meetingStatus === "C" ||
      interview.meetingStatus === "SE" ||
      interview.meetingStatus === "E" ||
      interview.meetingStatus === "P"
    ) {
      setEndButtonStatus(false);
      setNotesButtonStatus(false);
    }
  }, [interview, time, miliEnd]);

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
        getSingleInterview(id, token)(dispatch);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // on ending the meeting
  const handleEnded = async (
    interviewId: number,
    userId: number,
    token: string
  ) => {
    try {
      if (interviewId && userId && token) {
        const res = await updateMeetingEndedStatusService(
          interviewId,
          userId,
          token
        );
        getSingleInterview(id, token)(dispatch);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Add feedback in interview
  const handleNote = async (
    interviewId: number,
    userId: number,
    token: string,
    notes: string
  ) => {
    try {
      const res = await postStudentNotes(interviewId, userId, token, notes);
      getSingleInterview(id, token)(dispatch);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  console.log("inter", interview);
  return (
    <div>
      {/* <Navbar /> */}
      <UserNavbar title={"Details"} buttonName={"+ Book 1-1"} />
      <Header title={"Details"} buttonName={"Back"} />
      <br />
      <main>
        <Box bgColor={"#f1f5f9"} p={"20px"}>
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
              <Table w={"100%"} variant={"striped"} colorScheme="teal">
                <Tbody>
                  <Tr>
                    <Td
                      textAlign={"left"}
                      fontSize={"17px"}
                      fontWeight={"500"}
                    ></Td>
                    <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                      Title
                    </Td>
                    <Td
                      textAlign={"left"}
                      color={"black"}
                      fontSize={"17px"}
                      fontWeight={"500"}
                    >
                      {Object.keys(interview).length === 0
                        ? ""
                        : interview.title}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      textAlign={"left"}
                      fontSize={"17px"}
                      fontWeight={"500"}
                    ></Td>
                    <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                      Start Time
                    </Td>
                    <Td
                      textAlign={"left"}
                      color={"black"}
                      fontSize={"17px"}
                      fontWeight={"500"}
                    >
                      {Object.keys(interview).length === 0
                        ? ""
                        : convertTimeFormat(interview.startTime)}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      textAlign={"left"}
                      fontSize={"17px"}
                      fontWeight={"500"}
                    ></Td>
                    <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                      End Time
                    </Td>
                    <Td
                      textAlign={"left"}
                      color={"black"}
                      fontSize={"17px"}
                      fontWeight={"500"}
                    >
                      {Object.keys(interview).length === 0
                        ? ""
                        : convertTimeFormat(interview.endTime)}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      textAlign={"left"}
                      fontSize={"17px"}
                      fontWeight={"500"}
                    ></Td>
                    <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                      Interviewer Name
                    </Td>
                    <Td
                      textAlign={"left"}
                      color={"black"}
                      fontSize={"17px"}
                      fontWeight={"500"}
                    >
                      {Object.keys(interview).length === 0
                        ? ""
                        : interview.interviewerName}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      textAlign={"left"}
                      fontSize={"17px"}
                      fontWeight={"500"}
                    ></Td>
                    <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                      Interviewee Name
                    </Td>
                    <Td
                      textAlign={"left"}
                      color={"black"}
                      fontSize={"17px"}
                      fontWeight={"500"}
                    >
                      {Object.keys(interview).length === 0
                        ? ""
                        : interview.intervieweeName}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      textAlign={"left"}
                      fontSize={"17px"}
                      fontWeight={"500"}
                    ></Td>
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
                        <Text
                          color={"black"}
                          fontSize={"17px"}
                          fontWeight={"500"}
                        >
                          Started
                        </Text>
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
                  {interview.studentNote && (
                    <Tr>
                      <Td
                        textAlign={"left"}
                        fontSize={"17px"}
                        fontWeight={"500"}
                      ></Td>
                      <Td
                        textAlign={"left"}
                        fontSize={"17px"}
                        fontWeight={"500"}
                      >
                        Notes
                      </Td>
                      <Td textAlign={"left"}>
                        <Text
                          color={"black"}
                          fontSize={"17px"}
                          fontWeight={"500"}
                        >
                          {interview.studentNote}
                        </Text>
                      </Td>
                    </Tr>
                  )}
                  <Tr>
                    <Td
                      textAlign={"left"}
                      fontSize={"17px"}
                      fontWeight={"500"}
                    ></Td>
                    <Td textAlign={"left"} fontSize={"17px"} fontWeight={"500"}>
                      Date
                    </Td>
                    <Td
                      textAlign={"left"}
                      color={"black"}
                      fontSize={"17px"}
                      fontWeight={"500"}
                    >
                      {Object.keys(interview).length === 0
                        ? ""
                        : interview.date}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            )}
            <Flex justifyContent={"center"} gap={"10px"} marginTop={"20px"}>
              {startTimeStatus && (
                <Button
                  onClick={() =>
                    handleStarted(interview.interviewId, userId, token)
                  }
                  colorScheme="blue"
                >
                  Start
                </Button>
              )}
              {joinButtonStatus && (
                <Link
                  to={`${
                    Object.keys(interview).length !== 0 && interview.meetingLink
                  }`}
                  target="_blank"
                >
                  <Button colorScheme="blue">Join Meet</Button>
                </Link>
              )}
              {notesButtonStatus && (
                <Box display={"flex"} w={"200px"} textAlign={"left"}>
                  <Button onClick={onOpen} colorScheme="blue">
                    Add Notes
                  </Button>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Add Notes</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Textarea
                          onChange={(e) => {
                            setNotes(e.target.value);
                          }}
                        ></Textarea>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={() =>
                            handleNote(
                              interview.interviewId,
                              userId,
                              token,
                              notes
                            )
                          }
                        >
                          Add Note
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>
              )}
              {endButtonStatus && (
                <Button
                  onClick={() =>
                    handleEnded(interview.interviewId, userId, token)
                  }
                  colorScheme="blue"
                >
                  End
                </Button>
              )}
            </Flex>
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default InterviewDetails;

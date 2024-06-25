import React, { useState } from "react";
import { Box, Button, Divider, Flex, FormLabel, useMediaQuery, useToast } from "@chakra-ui/react";
import Navbar from '../../../../Components/Navbar/Navbar'
import BulkEventNav from "./BulkEventNav";
import { useDispatch, useSelector } from "react-redux";
import { createBulkInterview } from "../../../../Redux/ScheduleBulkInterviewAdmin/ActionCreators";
import { useNavigate } from "react-router-dom";

const CreateBulkEvent = () => {
  const [file, setFile] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.AuthReducer.token)
  const [isSmallerThan800] = useMediaQuery("(max-width: 600px)");

  const handleOnchange = (e: any) => {
    const fileList = e.target.files;
    if (fileList) {
      setFile(fileList[0]);
      console.log(fileList);
    }
  }

  const handleCreateSchedule = () => {
    const formData = new FormData();
    formData.append("file", file);
    createBulkInterview(formData, token)(dispatch).then((res: any) => {
      if (res) {
        toast({
          title: "Interview Schduled success",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
        navigate("/admin/dashboard");
      }
    }).catch((err)=>{
      if(err){
        toast({
          title: "Something Went Wrong",
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }
    })
  }

  // Down load csv file
  const downloadCsv = (csvData: string) => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "interview.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // creating csv file
  const createCsvData = (interview: any): string => {
    const headers = ["Interviewer's email", "Interviewee's email", "startTime", "endTime", "date(DD-MM-YYY)", "category", "instructions", "title", "zoomLink", "MeetingStatus", "batch"];
    const rows = interview.map(({ interviewerEmail, IntervieweeEmail, startTime, endTime, date, category, instructions, title, zoomLink, MeetingStatus, batch }: any) => [
      interviewerEmail,
      IntervieweeEmail,
      startTime,
      endTime,
      date,
      category,
      instructions,
      title,
      zoomLink,
      MeetingStatus,
      batch
    ]);
    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  };
  const interview = [
    {
      interviewerEmail: "rtridip2@gmail.com",
      IntervieweeEmail: "tridip@gmail.com",
      startTime: "12:00:00",
      endTime: "14:00:00",
      date: "02-07-2023",
      category: "DSA",
      instructions: "Join before 5 minutes",
      title: "Dsa interview with Tridip Rong",
      zoomLink: "https://us06web.zoom.us/j/81073976928#success",
      MeetingStatus: "P",
      batch: "sb201"
    },
  ];

  return (
    <div className="container">
      <Navbar />
      <BulkEventNav />
      <br/>
      <Box w={["95%","85%","75%"]} m={'auto'} mt={isSmallerThan800?'220px':"150px" } h="auto" p="5%" bg="white" borderRadius="10px" boxShadow="2px 4px 6px rgba(0, 0, 0, 0.1)">
        <Box margin={"auto"} borderRadius={"10px"} boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" width={"auto"} p="20px">
          <FormLabel fontSize={['15px','23px']} mt="20px" color="rgb(75 85 99)">Select CSV File</FormLabel>
          <input
            style={{ marginBottom: "20px", "fontWeight": "700" }}
            type="file"
            accept={".csv"}
            onChange={(e) => handleOnchange(e)}
          />
          <div style={{ "display": "Flex", "justifyContent": "space-between" }}>
          <Box w={'100%'}>
            <Button w={'100%'} mt={'1cm'} colorScheme="blue" onClick={handleCreateSchedule}>Schedule Interview</Button>
            <br />
            <Button w={'100%'} mt={'15px'} colorScheme="blue" onClick={() => downloadCsv(createCsvData(interview))}>Download Template</Button>
          </Box>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default CreateBulkEvent;

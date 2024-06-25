import {
  Box,
  Button,
  Divider,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Iinterviews } from "../../Services/AdminSideServices/GetEventsInterface";
import { useNavigate } from "react-router-dom";
interface ProfilecomponentProps {
  event: Iinterviews;
  GetEvents: any;
  section? : string;
}

const AdminInterviewBox = ({ event, GetEvents ,section}: ProfilecomponentProps) => {
  const [isCopied, setCopied] = useState(false);
  const [uniquelink, setuniqueLink] = useState<string | null>("");
  const navigate = useNavigate();

  // based on meeting status set interview pending on compleated
  const getMeetingStatusText = (status: string) => {
    switch (status) {
      case "E":
        return "Completed";
      case "P":
        return "Pending";
      case "C":
        return "Cancelled";
      case "S":
        return "Started";
      case "SS":
        return "Started by Student";
      case "IS":
        return "Started by Interviewer";
      case "SE":
        return "Ended by Student";
      case "IE":
        return "Ended by Interviewer";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    setuniqueLink(event.meetingLink);
  }, [event.meetingLink]);

  //for copying link and redirect when click on copylink | Join Button
  const handleCopyLink = () => {
    if (uniquelink != null) {
     
      navigator.clipboard.writeText(uniquelink);
    
      window.location.href = uniquelink;
    }
  };

  const GotoDetails = (id: number) => {
    navigate(`/admin/dashboard/interview/${id}`);
  };
  // const now = new Date();
  // const hours = now.getHours();
  // const minutes = now.getMinutes();
  // const seconds = now.getSeconds();
  // console.log(`${hours}:${minutes}:${seconds}`);
  return (
    <div>
      <Box
        w="100%"
        h="auto"

        p="15px"

        boxShadow="0 5px 15px rgba(0,0,0,0.06)"
        // border="1px solid grey"
        borderRadius="3px"
        letterSpacing={0.1}
        fontWeight={400}
      >
        <Box>
         { section!=="past-interviews" ? <Popover>
            <PopoverTrigger>
              <Flex
                cursor="pointer"
                pt="10px"
                pl="20px"
                pr="20px"
                justifyContent="flex-end"
              >
                <i
                  className="fa-solid fa-gear"
                  style={{ color: "#778087" }}
                ></i>{" "}
                <i
                  style={{ marginLeft: "10px", color: "#778087" }}
                  className="fa-solid fa-caret-down"
                ></i>{" "}
              </Flex>
            </PopoverTrigger>
            <PopoverContent  border="1px solid grey">
              <PopoverBody>
                <Box
                  cursor="pointer"
                  onClick={() =>
                    navigate(`/admin/inteviews/${event.interviewId}/edit`)
                  }
                >
               <Flex>
                <Box ml="20px" >
               <i className="fa-solid fa-pen-to-square"></i></Box>
                  <Text ml="20px" color="black" fontSize="16px">
                    Event Edit
                  </Text>
                  </Flex>
                </Box>
                <Divider mt="5px" />
              </PopoverBody>
            </PopoverContent>
          </Popover>:""}

          <Text color="#111827" fontWeight={700} >{event.title?.toUpperCase()}</Text>
          <Flex mt="12px" justifyContent="space-between" >
            <Text color="#5a5c60">{event.date} </Text>{" "}
            <Text color="#778087">{event.startTime} </Text>{" "}
          </Flex>
          <Flex mt="10px" justifyContent="space-between">
            <Text color="#5a5c60">{event.batch?.toUpperCase()}</Text>{" "}
            <Text color="#778087">{event.category} </Text>{" "}
          </Flex>
          <Flex mt="10px" justifyContent="space-between">
            {" "}
            <Text color="#5a5c60">Meeting Status</Text>
            <Text pl={2} pr={2} borderRadius={100} color={getMeetingStatusText(event?.meetingStatus)=="Pending" ?"#991B1B": "#166534"  }  bg={getMeetingStatusText(event?.meetingStatus)=="Pending" ?"#FEF2F2": "#DCFCE7"  }  >
              {getMeetingStatusText(event?.meetingStatus)}
            </Text>
          </Flex>
        </Box>

        <Divider mb="10px" mt="10px" />

        <Flex justifyContent="space-between" p="10px">
         {/* {isCopied ? (
            <Flex cursor="pointer" onClick={() => setCopied(!isCopied)}>
              {" "}
              <i
                style={{ padding: "5px", color: "grren" }}
                className="fa-solid fa-check"
              ></i>{" "}
              <Text>Copied</Text>
            </Flex>
          ) : (
            <Flex cursor="pointer" onClick={() => setCopied(!isCopied)}>
              <i
                className="fa-regular fa-copy"
                style={{
                  margin: "5px 5px ",
                  cursor: "pointer",
                  color: "#2a1ddb",
                }}
              ></i>{" "}
              <Text color="#1206b7" onClick={handleCopyLink}>
                Copy Link
              </Text>
            </Flex>
          )} 
           */}
          

          {section!=="past-interviews"?<Button color={"#fffffff7"} bg={"#3852f8ac"} onClick={handleCopyLink}>Join Meet</Button>:<Text fontSize={"15px"} color={"red"}>LINK EXPIRED</Text>}

          <Button
            variant="link"
            onClick={() => GotoDetails(event.interviewId)}
            color="#554aed"
          >
            View Details
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default AdminInterviewBox;

import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

interface InterviewResult {
  meetingStatus: string;
  count: number;
}

const TableForStats = ({ totalInterviews }: any) => {
  return (
    <React.Fragment>
      <Box>
        <Table variant="striped" colorScheme="blue" fontSize={['12px','14px','16px']}>
          <Thead>
            <Tr>
              <Th >Status</Th>
              <Th isNumeric>Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td  fontWeight="medium">Total Interviews </Td>
              <Td  fontWeight="medium" isNumeric>{totalInterviews?.totalInterviews}</Td>
            </Tr>
            {totalInterviews?.results?.map(
              (el: InterviewResult, index: number) => (
                <Tr key={index}>
                  {el.meetingStatus === "E" && (
                    <>
                      <Td fontWeight="medium">Interviews Completed</Td>
                      <Td fontWeight="medium" isNumeric>{el.count}</Td>
                    </>
                  )}

                  {el.meetingStatus === "P" && (
                    <>
                      <Td fontWeight="medium">Interviews Pending</Td>
                      <Td fontWeight="medium" isNumeric>{el.count}</Td>
                    </>
                  )}

                  {el.meetingStatus === "S" && (
                    <>
                      <Td fontWeight="medium">Interviews Started</Td>
                      <Td fontWeight="medium" isNumeric>{el.count}</Td>
                    </>
                  )}

                  {el.meetingStatus === "C" && (
                    <>
                      <Td fontWeight="medium">Interviews Cancelled</Td>
                      <Td fontWeight="medium" isNumeric>{el.count}</Td>
                    </>
                  )}

                  {el.meetingStatus === "SS" && (
                    <>
                      <Td fontWeight="medium" >Interviews Started by Student</Td>
                      <Td  fontWeight="medium" isNumeric>{el.count}</Td>
                    </>
                  )}

                  {el.meetingStatus === "IS" && (
                    <>
                      <Td fontWeight="medium" >Interviews Started by Interviewer</Td>
                      <Td fontWeight="medium" isNumeric>{el.count}</Td>
                    </>
                  )}

                  {el.meetingStatus === "SE" && (
                    <>
                      <Td fontWeight="medium" >Interviews Ended by Student</Td>
                      <Td fontWeight="medium" isNumeric>{el.count}</Td>
                    </>
                  )}

                  {el.meetingStatus === "IE" && (
                    <>
                      <Td fontWeight="medium">Interviews Ended by Interviewer</Td>
                      <Td fontWeight="medium" isNumeric>{el.count}</Td>
                    </>
                  )}
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </Box>
    </React.Fragment>
  );
};

export default TableForStats;

import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

interface InterviewResult {
  meetingStatus: string;
  count: number;
}

const SlotsStatsTable = ({ totalInterviews }: any) => {
  return (
    <React.Fragment>
      <Box>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Status</Th>
              <Th isNumeric>Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td fontWeight="medium">Total Slots</Td>
              <Td fontWeight="medium" isNumeric>{totalInterviews?.totalSlots}</Td>
            </Tr>
            {totalInterviews?.results?.map(
              (el: InterviewResult, index: number) => (
                <Tr key={index}>
                  {el.meetingStatus === "B" && (
                    <>
                      <Td fontWeight="medium">Slots Reserved</Td>

                      <Td  fontWeight="medium" isNumeric>{el.count}</Td>
                    </>
                  )}

                  {el.meetingStatus === "U" && (
                    <>
                      <Td fontWeight="medium">Slots Unreserved</Td>
                      <Td fontWeight="medium" isNumeric>{el.count}</Td>
                    </>
                  )}

                  {el.meetingStatus === "D" && (
                    <>
                      <Td fontWeight="medium">Slots Deleted</Td>
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

export default SlotsStatsTable;

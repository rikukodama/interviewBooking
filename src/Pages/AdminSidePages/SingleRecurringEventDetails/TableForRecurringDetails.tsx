import React from 'react'
import {Box, Table, Tbody, Td,  Tr } from  "@chakra-ui/react"
import { Link } from 'react-router-dom'

const TableForRecurringDetails = ({recurringEventDetails}:any) => {
  return (
    <React.Fragment>
    <Box overflowX="auto">
        <Table variant="striped" colorScheme="teal">
          
          <Tbody>
            <Tr>
              <Td  fontWeight="medium">Tilte</Td>
              <Td  fontWeight="medium" isNumeric>{recurringEventDetails.title}</Td>
            </Tr>
            <Tr>
              <Td  fontWeight="medium">Category</Td>
              <Td  fontWeight="medium" isNumeric>{recurringEventDetails.category}</Td>
            </Tr>
            <Tr>
              <Td  fontWeight="medium">Duration</Td>
              <Td  fontWeight="medium" isNumeric>{recurringEventDetails.duration} Mins</Td>
            </Tr>
            <Tr>
              <Td  fontWeight="medium">Meeting Location</Td>
              <Td  fontWeight="medium" isNumeric><Link color="blue" to={recurringEventDetails.meetingLink}>{recurringEventDetails.meetingLink}</Link></Td>
            </Tr>
            </Tbody>
            </Table>
            
      </Box>
      </React.Fragment>
  )
}

export default TableForRecurringDetails
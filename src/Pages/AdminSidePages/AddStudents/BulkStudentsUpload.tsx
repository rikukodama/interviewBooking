
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Stack,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AddBulkStudentService } from "../../../Services/AdminSideServices/GetEventsService";
import { token} from "../../../Assets/Assets";

const BulkStudentsUpload = () => {
  const [isSmallerThan1000] = useMediaQuery("(max-width: 1000px)");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const toast = useToast();

  
  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
    } else {
      setCsvFile(null);
    }
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!csvFile) return;
    const formData = new FormData();
    formData.append('file', csvFile);
    
    try {
      const response = await AddBulkStudentService(formData, token);
      if (response.data) {
        toast({
          title: "Successfully created Bulk Users by CSV file",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Down load csv file
  const downloadCsv = (csvData: string) => {
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "students.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // creating csv file
  const createCsvData = (students: any): string => {
    const headers = ["id", "name", "email", "password"];
    const rows = students.map(({ name, email, password,batch }: any) => [
      name,
      email,
      password,
      batch
    ]);
    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  };
  const students = [
    {
      id:1,
      name: "ravi",
      email: "john.doe@example.com",
      password: "1453673",
  
    },
  ];

 

  return (
    <div>
      <Box p="15px" w="100%">
        <FormLabel fontSize={['16px','16px','18px']}>Add Students In Bulk</FormLabel>
        <Divider />
        <Stack direction={isSmallerThan1000? "column": "row"} mt="30px">
          <Text fontSize={['12px','14px','16px']}>Download Template For Adding Students In Bulk</Text>
          <Button
            colorScheme="blue"
            fontSize={isSmallerThan1000 ? "12px" : "auto"}
            mt={'25px'}
            ml="20px"
            onClick={() => downloadCsv(createCsvData(students))}
          >
            Download
          </Button>
        </Stack>
        
        <form onSubmit={handleFormSubmit}>
        <Flex justifyContent="space-between" direction={isSmallerThan1000? "column": "row"} w="100%" mt="10%">
        <input type="file" accept=".csv" onChange={handleFileInputChange} />
        <Button fontSize={['12px','14px','16px']} mt={isSmallerThan1000?'25px':'0'} p={'15px'} colorScheme="blue" type="submit">Upload</Button>
        </Flex>
      </form>
       
      </Box>
    </div>
  );
};

export default BulkStudentsUpload;

import { useToast } from '@chakra-ui/react';
import React from 'react';

const ErrorToast = () => {
  const toast = useToast();

  return (
    <>
      {toast({
        title: "Something Went Wrong",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      })}
    </>
  );
};

export default ErrorToast;

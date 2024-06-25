import React from "react";

import { Input, Flex, Button, Box, Text } from "@chakra-ui/react";
import { useState, useRef } from "react";

// type PinComponentProps = {
//   onComplete: ({ pin: string | number; newPassword: number | string; })=>
// };

export function PinComponent({ onComplete }: any) {
  const [pins, setPins] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [newPassword,setPassword]  = useState<string|number>("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;
    const updatedPins = [...pins];
    updatedPins[index] = value.slice(-1);
    setPins(updatedPins);

    if (value !== "") {
      focusNextInput(index);
    }
  };

  const focusNextInput = (index: number) => {
    const nextIndex = index + 1;
    if (nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex].focus();
    } else {
      inputRefs.current[index].blur();
      // handleSubmit();
    }
  };

  const handleSubmit = () => {
    const pin = pins.join("");
    const payload = {
      otp:pin,
      newPassword
    }
    onComplete(payload);
  };

  return (
    <Box>
      <Text mb={"1%"}>Enter New Password</Text>
      <Input  mt={"16px"} placeholder="enter new password" value={newPassword} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} isRequired/>

      <Text mb={"1%"}>Enter 6 Digit OTP</Text>
      <Flex direction="row" justify="center" gap={"3%"}>
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <Input
            key={index}
            type="number"
            maxLength={1}
            value={pins[index]}
            onChange={(event) => handleChange(event, index)}
            ref={(input) => {
              inputRefs.current[index] = input as HTMLInputElement;
            }}
            sx={{
              width: "60px",
              mr: "4px",
              textAlign: "center",
            }}
            
          />
        ))}
      </Flex>
      <Button
       w={"100%"}
       variant={"solid"}
       bg={"black"}
       mt={"20px"}
       color={"white"}
        // colorScheme="blue"
        onClick={handleSubmit}
        isDisabled={pins.some((pin) => pin === "")}
      >
          Verify OTP
      </Button>
  </Box>
  );
}

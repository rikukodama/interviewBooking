import React from "react";
import { convertTo24Hour } from "../../utils/AddToAm";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormLabel,
  Input,
  Text,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import "../../Pages/AdminSidePages/OneOnOneSlotsEdit/index.css";

//this component is for schedule slots based on availability setting of days
const DayAvailability = ({ days, setDays }: any) => {
  const DayboxWidth = useBreakpointValue({ base: "170px", md: "170px" });
  const [isSmallerThan1100] = useMediaQuery("(max-width: 1100px)");
  
  // handle checkbox value change on checked
  const handleCheckboxChange = (index: number) => {
    const updatedDays = [...days];
    updatedDays[index].isChecked = !updatedDays[index].isChecked;
    setDays(updatedDays);
  };

  // handle input from start time and time for slots creation
  const handleInputChange = (
    dayIndex: number,
    inputIndex: number,
    field: "start" | "end",
    value: string
  ) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].inputs[inputIndex][field] = value;
    setDays(updatedDays);
    const currentInput = updatedDays[dayIndex].inputs[inputIndex];
    const currentStart = currentInput.start;
    const currentEnd = currentInput.end;

    const errorFeild = updatedDays[dayIndex].errors[inputIndex];

    if (inputIndex > 0) {
      var previousInput = updatedDays[dayIndex].inputs[inputIndex - 1];
      var previusEnd = convertTo24Hour(previousInput?.end);
      currentInput[field] = value;

      if (
        field === "start" &&
        previusEnd &&
        (currentStart < previusEnd ||
          (currentEnd !== "" && currentStart >= currentEnd))
      ) {
        errorFeild[field] = "Time Scheduling Mismatch";
        errorFeild["end"] = "";
      } else if (field === "end" && currentEnd <= currentStart) {
        const errorFeild = updatedDays[dayIndex].errors[inputIndex];
        errorFeild[field] = "Time Scheduling Mismatch";
        errorFeild["start"] = "";
      } else {
        const errorFeild = updatedDays[dayIndex].errors[inputIndex];
        errorFeild[field] = "";
      }
    } else {
      currentInput[field] = value;
      if (
        field === "start" &&
        currentEnd !== "" &&
        currentStart >= currentEnd
      ) {
        const errorFeild = updatedDays[dayIndex].errors[inputIndex];
        errorFeild[field] = "Time Scheduling Mismatch ";
        errorFeild["end"] = "";
      } else if (field === "end" && currentEnd <= currentStart) {
        const errorFeild = updatedDays[dayIndex].errors[inputIndex];
        errorFeild[field] = "Time Scheduling Mismatch";
        errorFeild["start"] = "";
      } else {
        const errorFeild = updatedDays[dayIndex].errors[inputIndex];
        errorFeild[field] = "";
      }
    }
    setDays(updatedDays);
  };

  // when click on plus symbol handle add inputs
  const handleAddInput = (dayIndex: number) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].inputs.push({ start: "", end: "" });
    updatedDays[dayIndex].errors.push({ start: "", end: "" });
    setDays(updatedDays);
  };

  // when click on remove symbol handle remove inputs
  const handleRemoveInput = (dayIndex: number, inputIndex: number) => {
    if (inputIndex === 0) {
      handleCheckboxChange(dayIndex);
    }

    const updatedDays = [...days];
    updatedDays[dayIndex].inputs.splice(inputIndex, 1);
    updatedDays[dayIndex].errors.splice(inputIndex, 1);
    setDays(updatedDays);
  };

  const displayMode = useBreakpointValue({ base: "block", md: "flex" });

  return (
    <div>
      {days.map((day: any, dayIndex: any) => (
        <Box key={day.name}>
          <Box pr="50px" display={displayMode} justifyContent="space-between" w="100%">
            <Flex flexDirection="row" >
              <Box mt="12px">
                <Checkbox
                  isChecked={day.isChecked}
                  onChange={() => handleCheckboxChange(dayIndex)}
                />
              </Box>
              <Box w={DayboxWidth}  className="checkbox-label">
                <FormLabel mt="8px" ml="10px">
                  {day.name}
                </FormLabel>
              </Box>
            </Flex>
            {day.isChecked ? (
              <Box className="input-group">
                {day.inputs?.map((input: any, inputIndex: any) => (
                  <Flex
                    key={inputIndex}
                    flexDirection={isSmallerThan1100 ? "column" : "row"}
                  >
                    <Box>
                      <Input
                        mt="5px"
                        w="100%"
                        type="time"
                        value={input.start}
                        onChange={(e) =>
                          handleInputChange(
                            dayIndex,
                            inputIndex,
                            "start",
                            e.target.value
                          )
                        }
                      />
                      <Text
                        ml="10px"
                        mt="5px"
                        fontSize="12px"
                        display={"block"}
                        color={"red"}
                      >
                        {days[dayIndex].errors[inputIndex].start}
                      </Text>
                    </Box>
                    <Box mt="7px" ml="10px" mr="10px">
                      -
                    </Box>
                    <Box>
                      <Input
                        mt="5px"
                        w="100%"
                        type="time"
                        value={input.end}
                        onChange={(e) =>
                          handleInputChange(
                            dayIndex,
                            inputIndex,
                            "end",
                            e.target.value
                          )
                        }
                      />
                      <Text
                        ml="10px"
                        mt="5px"
                        fontSize="12px"
                        display={"block"}
                        color={"red"}
                      >
                        {days[dayIndex].errors[inputIndex].end}
                      </Text>
                    </Box>

                    <Box
                      ml={["0", "10px"]}
                      mt={["5px", "0"]}
                      className="remove-button"
                      cursor="pointer"
                    >
                      {" "}
                      <Button
                        variant="unstyled"
                        onClick={() => handleRemoveInput(dayIndex, inputIndex)}
                      >
                        <i className="fa-solid fa-trash-can"></i>{" "}
                      </Button>
                    </Box>
                  </Flex>
                ))}
              </Box>
            ) : (
              <Box mr="20%" mt="8px">
                Unavailable
              </Box>
            )}
            <Button variant="unstyled">
              <i
                className="fa-solid fa-plus"
                onClick={() => handleAddInput(dayIndex)}
              ></i>
            </Button>
          </Box>

          <Divider mt="10px" mb="10px" />
        </Box>
      ))}
    </div>
  );
};

export default DayAvailability;

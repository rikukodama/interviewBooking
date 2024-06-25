import {
  IEventValues,
  IEventValuescreate,
} from "../../Pages/AdminSidePages/Interfacces";
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface ITimeslotsIput {
  values: any;
  EventValues: IEventValues;
  setEventValues: React.Dispatch<React.SetStateAction<IEventValuescreate>>;
}

const TimeslotsInput = ({
  values,
  EventValues,
  setEventValues,
}: ITimeslotsIput) => {
  const [timeSlots, setTimeSlots] = useState([
    {
      inputs: { startTime: "09:00", endTime: "17:00" },
      errors: { startTime: "", endTime: "" },
    },
  ]);
  const [isSmallerThan800] = useMediaQuery("(max-width: 800px)");
  const [slots, setSlots] = useState([{ startTime: "", endTime: "" }]);

  useEffect(() => {
    const newSlots = timeSlots.map((el) => el.inputs);
    if (newSlots) {
      setSlots(newSlots);
    }
  }, [timeSlots]);

  useEffect(() => {
    setEventValues({ ...values, slotTime: slots });
  }, [setEventValues, values, slots]);

  // adding input for time slots
  const handleAddTimeSlot = (index: number) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots.push({
      inputs: { startTime: "", endTime: "" },
      errors: { startTime: "", endTime: "" },
    });
    setTimeSlots(updatedTimeSlots);
  };

  // removing time slots when click on delete
  const handleRemoveTimeSlot = (index: number) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots.splice(index, 1);
    setTimeSlots(updatedTimeSlots);
  };

  // handle input from startTime time and time for slots creation
  const handleInputChange = (
    index: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].inputs[field] = value;
    setTimeSlots(updatedTimeSlots);
    const currentInput = updatedTimeSlots[index].inputs;
    const currentStart = currentInput.startTime;
    const currentEnd = currentInput.endTime;

    const errorFeild = updatedTimeSlots[index].errors;

    if (index > 0) {
      var previousInput = updatedTimeSlots[index - 1].inputs;
      var previusEnd = previousInput?.endTime;
      currentInput[field] = value;
      if (
        field === "startTime" &&
        previusEnd &&
        (currentStart < previusEnd ||
          (currentEnd !== "" && currentStart >= currentEnd))
      ) {
        errorFeild[field] = "Time Scheduling Mismatch";
        errorFeild["endTime"] = "";
      } else if (field === "endTime" && currentEnd <= currentStart) {
        const errorFeild = updatedTimeSlots[index].errors;
        errorFeild[field] = "Time Scheduling Mismatch";
        errorFeild["startTime"] = "";
      } else {
        const errorFeild = updatedTimeSlots[index].errors;
        errorFeild[field] = "";
      }
    } else {
      currentInput[field] = value;
      if (
        field === "startTime" &&
        currentEnd !== "" &&
        currentStart >= currentEnd
      ) {
        const errorFeild = updatedTimeSlots[index].errors;
        errorFeild[field] = "Time Scheduling Mismatch ";
        errorFeild["endTime"] = "";
      } else if (field === "endTime" && currentEnd <= currentStart) {
        const errorFeild = updatedTimeSlots[index].errors;
        errorFeild[field] = "Time Scheduling Mismatch";
        errorFeild["startTime"] = "";
      } else {
        const errorFeild = updatedTimeSlots[index].errors;
        errorFeild[field] = "";
      }
    }
    setTimeSlots(updatedTimeSlots);
  };

  return (
    <div>
      {timeSlots.map((timeSlot, index) => (
        <Box key={index}>
          <Flex
            flexWrap="wrap"
            flexDirection={isSmallerThan800 ? "column" : "row"}
            justifyContent="space-between"
            w="100%"
          >
            <Box>
              <Input
                mt="5px"
                w="100%"
                type="time"
                value={timeSlot.inputs.startTime}
                onChange={(e) =>
                  handleInputChange(index, "startTime", e.target.value)
                }
              />
              <Text
                ml="10px"
                mt="5px"
                fontSize="12px"
                display={"block"}
                color={"red"}
              >
                {timeSlot.errors.startTime}
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
                value={timeSlot.inputs.endTime}
                onChange={(e) =>
                  handleInputChange(index, "endTime", e.target.value)
                }
              />
              <Text
                ml="10px"
                mt="5px"
                fontSize="12px"
                display={"block"}
                color={"red"}
              >
                {timeSlot.errors.endTime}
              </Text>
            </Box>

            <Box ml="10px">
              {" "}
              <Button
                isDisabled={index === 0}
                onClick={() => handleRemoveTimeSlot(index)}
                variant="unstyled"
              >
                <i className="fa-solid fa-trash-can"></i>{" "}
              </Button>
            </Box>
            <Box>
              <Button variant="unstyled">
                <i
                  className="fa-solid fa-plus"
                  onClick={() => handleAddTimeSlot(index)}
                ></i>
              </Button>
            </Box>
          </Flex>
          <Divider mt="10px" mb="10px" />
        </Box>
      ))}
    </div>
  );
};

export default TimeslotsInput;

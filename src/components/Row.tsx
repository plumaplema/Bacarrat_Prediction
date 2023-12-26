import {
  Box,
  Radio,
  RadioGroup,
  Grid,
  GridItem,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useBoard } from "../storage/boardstorage";

const RadioButtonGrid = () => {
  const { changeHistoryBoard } = useBoard();

  const [values, setValues] = useState(Array(75).fill(null));

  const convertValuesToArray = () => {
    const convertedArray = values.map((item) => {
      if (item === "B") {
        return 1;
      } else if (item === "P") {
        return 0;
      } else if (item === "T") {
        return 2;
      }
    });
    return convertedArray;
  };

  const handleChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    //change the values P is 0, B is 1, T is 2
    const convertedValues = newValues.map((item) => {
      // Use newValues directly
      if (item === "B") {
        return 1;
      } else if (item === "P") {
        return 0;
      } else if (item === "T") {
        return 2;
      }
    });
    //remove the undefined values
    const filteredValues = convertedValues.filter((item) => item !== undefined);
    console.log(filteredValues);
    changeHistoryBoard(filteredValues);
  };

  return (
    <Grid
      templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)", "repeat(7, 1fr)"]}
      gap={6}
    >
      {Array.from({ length: 75 }, (_, index) => (
        <GridItem key={index}>
          <Box p={4} border="1px" borderRadius="md" borderColor="gray.200">
            <HStack spacing={3} align="start">
              <RadioGroup
                value={values[index]}
                onChange={(value) => handleChange(index, value)}
                isDisabled={index > 0 ? values[index - 1] === null : false} // Added this line
              >
                <HStack>
                  <Radio value="P" colorScheme={"blue"}>
                    P
                  </Radio>
                  <Radio value="B" colorScheme={"red"}>
                    B
                  </Radio>
                  <Radio value="T" colorScheme={"gray"}>
                    T
                  </Radio>
                </HStack>
              </RadioGroup>
            </HStack>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default RadioButtonGrid;

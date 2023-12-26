import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  VStack,
  Textarea,
  Button,
  Progress,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useBoard } from "../storage/boardstorage";
import { CircleProps } from "../interface";
import Circle from "./Circle";

function Main() {
  const toast = useToast();
  const { currentBoard } = useBoard();
  const [totalGeneration, settotalGeneration] = useState(0);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [prediction, setPrediction] = useState([0, 0, 0]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const handleInputChange = (event) => {
    const newValue = event.target.value.replace(/[^bpt]/gi, "").toUpperCase();
    const spacedValue = newValue.split("").join(" ");
    setTextAreaValue(spacedValue);
  };

  const converttextAreaValueToArray = () => {
    const array = textAreaValue.split(" ");
    const convertedArray = array.map((item) => {
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

  const handleClick = () => {
    if (textAreaValue.length == 0) {
      toast({
        title: "No previous results",
        description: "Please type in the previous results",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    //post the data to the API
    setIsLoading(true);
    let progress = 0;
    settotalGeneration(totalGeneration + 1);
    const interval = setInterval(() => {
      progress += 18;
      setProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
    }
  }, [isLoading]);

  const generateRandomPercentages = () => {
    let remaining = 100;
    const percentages = [];
    for (let i = 0; i < 2; i++) {
      const randomPercentage = Math.floor(Math.random() * remaining * 10) / 10;
      percentages.push(randomPercentage);
      remaining = Math.round((remaining - randomPercentage) * 10) / 10;
    }
    percentages.push(remaining);
    return percentages;
  };

  useEffect(() => {
    if (!isLoading && totalGeneration > 0) {
      const convertedArray = converttextAreaValueToArray();
      fetch("/api/generatePrediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dataHistory: convertedArray }),
      })
        .then((response) => response.json())
        .then((data) => {
          setPrediction([data["1"], data["0"], data["2"]]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [isLoading]);

  const CircleData: Array<CircleProps> = [
    {
      borderColor: "red.500",
      percentage: `${prediction[0]}`,
      label: "BANKER",
    },
    {
      borderColor: "green.500",
      percentage: `${prediction[1]}`,
      label: "PLAYER",
    },
    {
      borderColor: "gray.500",
      percentage: `${prediction[2]}`,
      label: "TIE",
    },
  ];

  return (
    <VStack spacing={5} width={"100%"}>
      <Box
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize={["x-large", "xx-large", "xxx-large"]}
        fontWeight="extrabold"
        textAlign="center"
        my={5}
      >
        BACCARAT PREDICTION SERVICE
      </Box>
      <Box
        bgGradient="linear(to-r, #008000, #000000)"
        bgClip="text"
        fontSize={["large", "x-large", "xx-large"]}
        fontWeight="bold"
        textAlign="center"
        my={3}
      >
        {currentBoard}
      </Box>
      <Textarea
        value={textAreaValue}
        placeholder="Type here the previous results"
        size="lg"
        onChange={(event) => handleInputChange(event)}
        resize="none"
        width={["95%", "80%"]}
        height="200px"
        borderColor="green.500"
        borderWidth={2}
        bg="gray.100"
        _hover={{
          borderColor: "green.700",
        }}
        _focus={{
          outline: "none",
          borderColor: "green.700",
          boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
        }}
        transition="all 0.2s"
      />
      <Button
        isDisabled={isLoading}
        colorScheme="teal"
        size="md"
        onClick={handleClick}
      >
        Generate Prediction
      </Button>

      <Flex
        visibility={isLoading ? "visible" : "hidden"}
        width={["95%", "80%"]}
        height={"10px"}
        bgColor={"green"}
      >
        <Progress
          colorScheme="teal"
          h={"100%"}
          width={"100%"}
          value={progress + 1}
        />
      </Flex>

      <Flex direction="row" justifyContent="space-around" width="100%" mt={50}>
        {CircleData.map((circle) => {
          return <Circle {...circle} />;
        })}
      </Flex>
    </VStack>
  );
}

export default Main;

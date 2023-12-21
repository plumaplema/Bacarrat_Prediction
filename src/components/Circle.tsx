import { VStack, Box, Text } from "@chakra-ui/react";
import { CircleProps } from "../interface";

const Circle: React.FC<CircleProps> = ({ borderColor, percentage, label }) => (
  <VStack>
    <Box
      w="150px"
      h="150px"
      borderRadius="50%"
      borderWidth="15px"
      borderColor={borderColor}
      display="flex"
      fontSize={"xx-large"}
      alignItems="center"
      justifyContent="center"
    >
      {percentage}
    </Box>
    <Text>{label}</Text>
  </VStack>
);

export default Circle;

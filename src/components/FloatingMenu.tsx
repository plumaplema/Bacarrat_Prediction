import React, { useState } from "react";
import {
  Box,
  Button,
  Circle,
  Flex,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaHome, FaUser, FaBell, FaCog, FaPlus } from "react-icons/fa";
import {
  Bs1CircleFill,
  Bs2CircleFill,
  Bs3CircleFill,
  Bs4CircleFill,
} from "react-icons/bs";
import { useBoard } from "../storage/boardstorage";

const MenuItem = ({ icon, label, bgColor, onClick }) => (
  <Flex direction="column" alignItems="center">
    <Circle
      size="10"
      bg={bgColor}
      onClick={onClick}
      _hover={{
        cursor: "pointer",
        transform: "scale(1.1)",
        transition: "0.3s",
        fontWeight: "bold",
      }}
    >
      <Icon as={icon} boxSize={6} color="white" />
    </Circle>
    <Text fontSize={"xs"}>{label}</Text>
  </Flex>
);

const FloatingMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { changeBoard } = useBoard();

  const handleMenuClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBlur = () => {
    setIsExpanded(false);
  };

  const handleItemClick = ({ item }: { item: string }) => {
    setIsExpanded(false);
    changeBoard(item);
  };

  const menuItems = [
    {
      icon: Bs1CircleFill,
      label: "Bead Plate",
      bgColor: "red.500",
      item: "Bead Plate",
    },
    {
      icon: Bs2CircleFill,
      label: "Big Road",
      bgColor: "blue.500",
      item: "Big Road",
    },
    {
      icon: Bs3CircleFill,
      label: "Small Road",
      bgColor: "green.500",
      item: "Small Road",
    },
    {
      icon: Bs4CircleFill,
      label: "Cockroach Road",
      bgColor: "yellow.500",
      item: "Cockroach Road",
    },
  ];

  return (
    <Flex
      position="fixed"
      bottom="4"
      right="4"
      direction="column"
      alignItems="flex-end"
      onBlur={handleBlur}
      tabIndex={-1} // This makes the div focusable
    >
      {!isExpanded && (
        <IconButton
          size="lg"
          colorScheme="teal"
          onClick={handleMenuClick}
          icon={<FaPlus />}
          isRound
          aria-label={""}
        />
      )}

      {isExpanded && (
        <VStack mt={10} spacing={5}>
          {menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem.item}
              icon={menuItem.icon}
              label={menuItem.label}
              bgColor={menuItem.bgColor}
              onClick={() => handleItemClick({ item: menuItem.item })}
            />
          ))}
        </VStack>
      )}
    </Flex>
  );
};

export default FloatingMenu;

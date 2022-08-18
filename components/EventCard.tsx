import React from "react";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";
import { IHistoricalDate } from "../types";

const EventCard: React.FC<{ item: IHistoricalDate; score?: number }> = ({
  item: { category1, date, description },
  score,
}) => {
  return (
    <Box
      maxW={"445px"}
      w={"full"}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
    >
      <Stack>
        <Text
          color={"green.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"sm"}
          letterSpacing={1.1}
        >
          {date}
        </Text>
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          Score: {score}
        </Heading>
        <Text color={"gray.500"}>{description}</Text>
      </Stack>
    </Box>
  );
};

export default EventCard;

import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Fuse from "fuse.js";
import { IHistoricalDate } from "../types";
import EventCard from "./EventCard";

const EventList: React.FC<{ data: Fuse.FuseResult<IHistoricalDate>[] }> = ({
  data,
}) => (
  <Box p={4}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
      {data &&
        data.length > 0 &&
        data.map((result, index) => <EventCard key={index} {...result} />)}
    </SimpleGrid>
  </Box>
);

export const EventMeiliSearchList: React.FC<{ data: IHistoricalDate[] }> = ({
  data,
}) => (
  <Box p={4}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
      {data &&
        data.length > 0 &&
        data.map((result, index) => <EventCard key={index} item={result} />)}
    </SimpleGrid>
  </Box>
);

export default EventList;

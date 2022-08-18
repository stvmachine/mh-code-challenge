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
        data.map((result) => <EventCard key={result.item.id} {...result} />)}
    </SimpleGrid>
  </Box>
);

export default EventList;

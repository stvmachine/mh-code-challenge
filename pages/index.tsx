import React from "react";
import type { NextPage } from "next";
import {
  Box,
  Heading,
  Text,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { useFuzzy } from "react-use-fuzzy";

import historicalEvents from "../data/historical_events.json";
import EventList from "../components/EventList";
import { IHistoricalDate } from "../types";

const Home: NextPage = () => {
  const {
    result: rawResults,
    keyword,
    search,
  } = useFuzzy<IHistoricalDate>(historicalEvents, {
    keys: ["date", "description", "lang", "category1", "category2"],
  });

  // NOTE: Apparently, useFuzzy doesn't clean initially the data and when the search finishes the result includes more params
  const results = rawResults.map((e: any) => (e?.item ? e : { item: e }));

  return (
    <Stack
      as="main"
      spacing={8}
      justifyContent="center"
      alignItems="flex-start"
      m="0 auto 2rem auto"
      maxWidth="1200px"
    >
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        maxWidth="1200px"
      >
        <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
          react-use-fuzzy
        </Heading>
        <Text>{results.length}</Text>
        <InputGroup my={4} mr={4} w="100%">
          <Input
            aria-label="Search articles"
            onChange={(e) => search(e.target.value)}
            placeholder="Search articles"
            value={keyword}
          />
          <InputRightElement>
            <Icon name="search" color="gray.300" />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        maxWidth="1200px"
        mt={8}
      >
        <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
          Filtered results
        </Heading>
        <EventList data={results} />
      </Flex>
    </Stack>
  );
};

export default Home;

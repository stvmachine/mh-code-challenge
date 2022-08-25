import React, { useMemo, useState } from "react";
import type { NextPage } from "next";
import {
  Heading,
  Text,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import Fuse from "fuse.js";

import historicalEvents from "../data/historical_events.json";
import useDebounce from "../hooks/useDebounce";
import { IHistoricalDate } from "../types";
import EventList from "../components/EventList";

const FUSE_OPTIONS: Fuse.IFuseOptions<IHistoricalDate> & {
  includeScore: true;
} = {
  includeScore: true,
  keys: ["date", "description", "lang", "category1", "category2"],
};

const Home: NextPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const debouncedSearchTerm = useDebounce(keyword, 500);

  const searcher = useMemo(() => new Fuse(historicalEvents, FUSE_OPTIONS), []);

  const results: Fuse.FuseResult<IHistoricalDate>[] = useMemo(
    () => searcher.search(debouncedSearchTerm),
    [debouncedSearchTerm, searcher]
  );

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
          Fuse.js + debounced keyword
        </Heading>
        <Text>Results found: {results.length}</Text>
        <InputGroup my={4} mr={4} w="100%">
          <Input
            aria-label="Search articles"
            onChange={(e) => setKeyword(e.target.value)}
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
        {debouncedSearchTerm && <EventList data={results} />}
        {!debouncedSearchTerm && (
          <Text>Please write at least one character to start browsing</Text>
        )}
      </Flex>
    </Stack>
  );
};

export default Home;

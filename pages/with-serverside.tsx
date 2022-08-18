import React, { useEffect, useMemo, useState } from "react";
import { NextPage } from "next";
import { MeiliSearch } from "meilisearch";
import {
  Flex,
  Text,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";

import useDebounce from "../hooks/useDebounce";
import { EventMeiliSearchList } from "../components/EventList";

const client = new MeiliSearch({
  host: "https://meilisearch-production-f61d.up.railway.app/",
  apiKey: "StrongKeyIncluding123",
});

const WithServerside: NextPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [results, setResults] = useState<any>([]);
  const debouncedSearchTerm = useDebounce(keyword, 500);
  const historicalEventsIndex = useMemo(
    () => client.index("historical_events"),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await historicalEventsIndex.search(debouncedSearchTerm, {
        limit: 1000,
      });
      setResults(data);
    };

    fetchData();
  }, [debouncedSearchTerm, historicalEventsIndex]);

  console.log(results);

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
          Meilisearch + debounced keyword
        </Heading>
        <Text>
          {results?.hits?.length ?? 0} found in {results?.processingTimeMs} ms
        </Text>
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
        <EventMeiliSearchList data={results.hits} />
      </Flex>
    </Stack>
  );
};

export default WithServerside;

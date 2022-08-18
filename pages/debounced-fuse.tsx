import React, { useMemo, useState } from "react";
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
import Fuse from "fuse.js";
import historicalEvents from "../data/historical_events.json";
import useDebounce from "../hooks/useDebounce";

type IHistoricalDate = {
  id: number;
  date: string;
  description: string;
  lang: string;
  category1?: string;
  category2?: string;
  granularity?: string;
};

const FUSE_OPTIONS: Fuse.IFuseOptions<IHistoricalDate> & {
  includeScore: true;
} = {
  includeScore: true,
  keys: ["date", "description", "lang", "category1", "category2"],
};

const ResultList: React.FC<{ data: Fuse.FuseResult<IHistoricalDate>[] }> = ({
  data,
}) => (
  <>
    {data &&
      data.length > 0 &&
      data.map((result) => <Item key={result.item.id} {...result} />)}
  </>
);

const Item: React.FC<Fuse.FuseResult<IHistoricalDate>> = ({
  item: { category1, date, description },
  score,
}) => (
  <Box mb={8} display="block" width="100%">
    <Flex
      width="100%"
      align="flex-start"
      justifyContent="space-between"
      flexDirection={["column", "row"]}
    >
      <Heading size="md" as="h3" mb={2} fontWeight="medium">
        {date}
      </Heading>
      <Text
        color="gray.500"
        minWidth="105px"
        textAlign={["left", "right"]}
        mb={[4, 0]}
      >
        {category1}
      </Text>
      <Text>{score}</Text>
    </Flex>
    <Text>{description}</Text>
  </Box>
);

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
      m="0 auto 4rem auto"
      maxWidth="700px"
    >
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        maxWidth="700px"
      >
        <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
          Fuse.js + debounced keyword
        </Heading>
        <Text>{results.length}</Text>
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
        maxWidth="700px"
        mt={8}
      >
        <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
          Filtered results
        </Heading>
        {debouncedSearchTerm && <ResultList data={results} />}
        {!debouncedSearchTerm && (
          <Text>Please write at least one character to start browsing</Text>
        )}
      </Flex>
    </Stack>
  );
};

export default Home;

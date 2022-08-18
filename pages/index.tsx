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

type IHistoricalDate = {
  id: number;
  date: string;
  description: string;
  lang: string;
  category1?: string;
  category2?: string;
  granularity?: string;
};

const ResultList: React.FC<{ data: IHistoricalDate[] }> = ({ data }) => (
  <>
    {data &&
      data.length > 0 &&
      data.map((item) => <Item key={item.id} {...item} />)}
  </>
);

const Item: React.FC<IHistoricalDate> = ({ category1, date, description }) => (
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
    </Flex>
    <Text>{description}</Text>
  </Box>
);

const Home: NextPage = () => {
  const {
    result: rawResults,
    keyword,
    search,
  } = useFuzzy<IHistoricalDate>(historicalEvents, {
    keys: ["date", "description", "lang", "category1", "category2"],
  });

  const result = rawResults.map((e) => e.item || e);

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
        <Text>{result.length}</Text>
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
        <ResultList data={result} />
      </Flex>
    </Stack>
  );
};

export default Home;

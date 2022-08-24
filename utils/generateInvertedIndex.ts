import { IHistoricalDate } from "../types";

export const generateInvertedIndex = (data: IHistoricalDate[]) => {
  const invertedIndex: Record<string, number[]> = {};
  // e.g. { 'caesar': [ 1 , 2 ], 'julius: [3] }

  data.forEach((item) => {
    // let's just focus on the description for now
    const { description } = item;

    // let's tokenize the description
    // e.g. "Gaius Caesar and Lucius Aemilius Paullus are appointed consuls."
    // would generate ["gaius", "caesar", "and", "lucius", "aemilius", "paullus", "are", "appointed", "consuls"]

    const words: string[] = description
      // remove any character that is not alphanumeric or whitespace
      .replace(/[^\w\s_]/g, "")
      //replace double white space for single space
      .replace(/\s+/g, " ")
      // lets convert to lowercase
      .toLowerCase()
      //hopefully, splitting individual words
      .split(" ");

    // iterate over words to populate the index
    words.forEach((word) => {
      if (!invertedIndex[word]) {
        invertedIndex[word] = [item.id];
      }
      // if the word is already in the index and the document is not already included
      else if (
        invertedIndex[word] &&
        !invertedIndex[word].find((i) => i === item.id)
      ) {
        invertedIndex[word].push(item.id);
      } else {
        // nothing
      }
    });
  });

  return invertedIndex;
};

export const testInvertedIndex = (
  data: IHistoricalDate[],
  searchText: string
) => {
  const invertedIndex = generateInvertedIndex(data);

  let results: number[] = [];
  let matches = 0;

  searchText.split(/" "/g).forEach((st) => {
    if (invertedIndex[st]) {
      // first match, add all the documents
      if (matches === 0) {
        results.concat(invertedIndex[st]);
      } else {
        // remove from the results, documents that are not considered in new iterations
        results = results.filter((result) =>
          invertedIndex[st].includes(result)
        );
      }

      // increase the number of matches
      matches++;
    }

    // regex match
    else {
      // first match, add all the documents
      if (matches === 0) {
        results.concat(invertedIndex[st]);
      }

      Object.keys(invertedIndex).forEach((iv) => {
        if (iv.match(searchText) !== null) {
          results.filter((result) => invertedIndex[st].includes(result));
        }
      });

      // increase the number of matches
      matches++;
    }
  });

  return results;
};

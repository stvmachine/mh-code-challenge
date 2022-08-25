import { IHistoricalDate } from "../types";
import { eng as stopWordsEng } from "./stopwords_eng";

type IInvertedIndex = Record<string, number[]>;

export const generateInvertedIndex = (data: IHistoricalDate[]) => {
  const invertedIndex: IInvertedIndex = {};
  // e.g. { 'caesar': [ 1 , 2 ], 'julius: [3] }

  data.forEach((item) => {
    // let's just focus on the description for now
    const { description } = item;

    // let's tokenize the description
    // e.g. "Gaius Caesar and Lucius Aemilius Paullus are appointed consuls."
    // would generate ["gaius", "caesar", "and", "lucius", "aemilius", "paullus", "are", "appointed", "consuls"]

    const words: string[] = description
      // remove any character that is not alphanumeric or whitespace
      .replace(/[^\w\s_]/g, " ")
      //replace double white space for single space
      .replace(/\s+/g, " ")
      // lets convert to lowercase
      .toLowerCase()
      //hopefully, splitting individual words
      .split(" ")
      // filter by stopwords
      .filter((w) => w && !stopWordsEng.includes(w));

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
  invertedIndex: IInvertedIndex,
  searchText: string
) => {
  let results: number[] = [];
  let matches = 0;

  searchText
    .replace(/[^\w\s_]/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ")
    .filter((w) => w)
    .forEach((token) => {
      // check if the token is an actual key in the dictionary
      if (invertedIndex[token]) {
        // first match, add all the documents
        if (matches === 0) {
          results = results.concat(invertedIndex[token]);
        } else {
          // remove from the results, documents that are not considered in new iterations
          results = results.filter((result) =>
            invertedIndex[token].includes(result)
          );
        }

        // increase the number of matches
        matches++;
      }

      // regex match
      else {
        Object.keys(invertedIndex).forEach((ivKey) => {
          if (ivKey.match(token) !== null) {
            if (matches === 0) {
              results = results.concat(invertedIndex[ivKey]);
            } else {
              results = results.filter((result) =>
                invertedIndex[ivKey].includes(result)
              );
            }

            matches++;
          }
        });
      }
    });

  return results;
};

import data from "../data/historical_events.json";
import {
  generateInvertedIndex,
  testInvertedIndex,
} from "./generateInvertedIndex";

test("generateInvertedIndex generates an index", () => {
  const invertedIndex = generateInvertedIndex(data.slice(0, 3));

  expect(invertedIndex).not.toBeNull();
  // outcome: {"1": [0], "5": [0], "aemilius": [1], "antonia": [2], "appointed": [1], "augustus": [0], "caesar": [1, 2], "claudius": [2], "consuls": [1], "daughter": [2], "drusus": [2], "effort": [2], "gain": [2], "gaius": [1, 2], "germania": [0], "livilla": [2], "lucius": [1], "marries": [2], "minor": [2], "nero": [2], "order": [0], "paullus": [1], "prestige": [2], "quells": [0], "revolts": [0], "tiberius": [0]}
  expect(Object.keys(invertedIndex).length).toBe(26);
  // outcome: 26
});

describe("#testInvertedIndex", () => {
  const invertedIndex = {
    "1": [0],
    "5": [0],
    aemilius: [1],
    antonia: [2],
    appointed: [1],
    augustus: [0],
    caesar: [1, 2],
    claudius: [2],
    consuls: [1],
    daughter: [2],
    drusus: [2],
    effort: [2],
    gain: [2],
    gaius: [1, 2],
    germania: [0],
    livilla: [2],
    lucius: [1],
    marries: [2],
    minor: [2],
    nero: [2],
    order: [0],
    paullus: [1],
    prestige: [2],
    quells: [0],
    revolts: [0],
    tiberius: [0],
  };

  test("with a single existing match", () => {
    const results = testInvertedIndex(invertedIndex, "caesar");
    expect(results).toEqual([1, 2]);

    const results2 = testInvertedIndex(invertedIndex, "lucius");
    expect(results2).toEqual([1]);
  });

  test("with a single partial and existing match", () => {
    const results = testInvertedIndex(invertedIndex, "cae");
    expect(results).toEqual([1, 2]);

    const results2 = testInvertedIndex(invertedIndex, "luc");
    expect(results2).toEqual([1]);
  });

  test("with a single non existing match", () => {
    const results = testInvertedIndex(invertedIndex, "xxx");
    expect(results).toEqual([]);
  });

  test("with multiple existing matches", () => {
    const results = testInvertedIndex(invertedIndex, "caesar lucius");
    expect(results).toEqual([1]);
  });

  test("with multiple partial and existing matches", () => {
    const results = testInvertedIndex(invertedIndex, "cae luc");
    expect(results).toEqual([1]);
  });

  // TODO: Create test to decide what to do when a query word doesn't have a match.
  // For now, it just being ignored
  xtest("with multiple partial and existing matches and non existing match", () => {
    const results = testInvertedIndex(invertedIndex, "cae luc xxx");
    expect(results).toEqual([]);
  });

  // TODO: Create test using a bigger subset that include at least two matches for the same query
  xtest("with multiple matches to the same word", () => {});
});

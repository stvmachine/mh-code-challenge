# Why does this repository exist?

This is the result of a code challenge that involved the following technologies: ReactJS, NextJS, Chakra-UI, Fuse.js and MeiliSearch. The structure is simple, but it follows good practices from the first commit such as the use of javascript linter (ESLint), the use of typescript, it also shows a clear separation and definition of components, pages, types and hooks.

## Brief: Search History

Build a simple application that allows users to search this JSON data set of historical events.

### Basic Functionality

Users can enter search terms into a text field. Historical events that match the search terms are
displayed as a list.

- The JSON data can either be embedded into the application or fetched over the network
- Use of third-party libraries is fine, though of course it’s your own code that we’ll be
looking at

#### Extra Credit

This is your chance to show us what you can really do! Add one or more of the following
features, or come up with your own idea...

- Real time update
- Imperfect matches (e.g. allowing for differences in whitespace, spelling etc.)
- Auto-complete
- Ordering results by quality of match
- ...or any other cool feature you can think of

## How to use

Nextjs preview: https://mh-code-challenge.vercel.app/

OR

1. Download the repo [or clone it]
2. Install dependencies and run

```bash
yarn
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Some comments

Three different tests have been done on this repository, the way to access each of them is to add to the path the route e.g.: `localhost:3000/with-serverside`. Overall, I think I decided to compare between client-side and server-side solutions because, in my head, there's always some point where that decision is relevant. For the server side, I tried with the coolest implementation I found which was a Rust based service, sadly I didn't learn more about Rust :(.

1. `react-use-fuzzy`: Technically, its just react with [Fuse.js](https://fusejs.io/) but through a handy hook called [react-use-fuzzy](https://github.com/joshuatonga/react-use-fuzzy).
2. `debounced-fuse`: I was not happy with the hook library, so i decided to use directly Fuse.js and also i added some additional hooks to ensure that for example we don't have to do extra calls to the searcher algorithm.
3. `with-serverside`: The option 1 and 2 are client-side, so in this case i decided to try server-side. There are multiple options as the popular `Elastic search` but i decided to try a solution based on Rust called [MeiliSearch](https://www.meilisearch.com/).

The docs are really useful and I ended creating a cloud instance with the data, so basically I'm query against that instance:

```bash
QUERY_URL=https://meilisearch-production-f61d.up.railway.app/
API_KEY= StrongKeyIncluding123
```

You can hit the query url in the browser and its going to display some kind of preview website, you would need the API_KEY to do queries though.

## Aditional thoughts

1. I was thinking of this idea of use synonyms through Tensorflow. I did something like that a while ago but it would be interesting to run it in a different area. More info about that work:

    - <https://www.commoncode.io/blog/kaggle-covid-challenge>
    - <https://www.kaggle.com/code/estebancampos/covid-19-scientific-papers-with-doc2vec/notebook>

2. The other idea that i have is just play with different algorithms to understand what they normally do and try to tweak them a bit just for fun.

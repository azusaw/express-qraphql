import "./App.css";
import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const GET_HELLO = gql`
  query {
    hello
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const [res, setRes] = useState("");

  /* Apollo data fetch */
  const { loading, error, data } = useQuery(GET_HELLO);

  /* これがないとデータがない状態で表示しようとしてエラーになる */
  if (loading) return <p>Loading...</p>;
  if (error) return <p>[Error] {error.toString()}</p>;

  /* without Apollo */
  const fetchDate = () => {
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: "{ hello }" }),
    })
      .then((r) => r.json())
      .then((json) => {
        setRes(json.data.hello);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchDate}>Get graphql</button>
        {"fetch :"}
        {res}
        <br />
        {"apollo:"}
        {data.hello}
      </header>
    </div>
  );
}

function AppWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default AppWrapper;

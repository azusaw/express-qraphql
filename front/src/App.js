import './App.css';
import {useState} from "react";

function App() {
  const [res, setRes] = useState("")

  const fetchDate = () => {
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: "{ hello }" }),
    })
      .then(r => r.json())
      .then(json => {
        setRes(json.data.hello)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchDate}>Get graphql</button>
        {res}
      </header>
    </div>
  );
}

export default App;

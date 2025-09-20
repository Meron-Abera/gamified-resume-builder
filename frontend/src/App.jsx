import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from "react";

function App() {
  // const [count, setCount] = useState(0)
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/hello") // backend endpoint
            .then(res => res.text())
            .then(setMessage);
    }, []);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/*<button onClick={() => setCount((count) => count + 1)}>*/}
        {/*  count is {count}*/}
        {/*</button>*/}
          <h1>Frontend is running!</h1>
          <h2>Backend says: {message}</h2>
        {/*<p>*/}
        {/*  Edit <code>src/App.jsx</code> and save to test HMR*/}
        {/*</p>*/}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

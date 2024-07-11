import { ChangeEvent, FormEvent, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [formContent, setFormContent] = useState("");

  const hSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  };

  const hChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value) setFormContent(evt.target.value);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <form onSubmit={hSubmit}>
          <input type="text" onChange={hChange} placeholder="Type anything" />
        </form>
      </div>
      <p className="read-the-docs">
        Here's the content of your input: {formContent}
      </p>
    </>
  );
}

export default App;

import "./App.css";
import Router from "./routes/router";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;

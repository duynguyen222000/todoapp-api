import { Outlet } from "react-router-dom";
import "./App.css";
import Movie from "./components/Movie/Movie";
import Navbar from "./components/Movie/Navbar";
import ToDoList from "./components/Todo/ToDoList";

function App() {
  return (
    <div className="App">
      <ToDoList />
    </div>
  );
}

export default App;

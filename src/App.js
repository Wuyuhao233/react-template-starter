import { Route, Routes } from "react-router-dom";
import "./App.less";
import HomePage from "./component/home";
import Login from "./component/login";
import Profile from "./component/profile";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;

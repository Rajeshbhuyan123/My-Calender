import LoginPage from "./components/login";
import { Routes, Route } from "react-router-dom"
import Calendar from "./components/calender";
import Signup from "./components/signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/calender" element={<Calendar/>}/>
      </Routes>
    </div>
  );
}

export default App;

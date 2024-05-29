import React from "react";
import "./App.css";
import Homepage from "./Pages/Homepage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chatpage from "./Pages/Chatpage.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/chats" element={<Chatpage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

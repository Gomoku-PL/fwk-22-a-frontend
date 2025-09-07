// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BoardWrapper from "./components/board/BoardWrapper";

export default function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Home />} />

       
        <Route path="/game/tempId" element={<BoardWrapper />} />
      </Routes>
    </Router>
  );
}

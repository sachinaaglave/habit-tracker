import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HabitInput from "./components/HabitInput";
import HabitDisplay from "./components/HabitDisplay";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HabitInput />} />
        <Route path="/display" element={<HabitDisplay />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;

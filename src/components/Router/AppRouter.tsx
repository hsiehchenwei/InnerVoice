import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../../App";
import DemoList from "../DemoList/DemoList";
import RandomNote from "../RandomNote/RandomNote";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/demo" element={<DemoList />} />
        <Route path="/demo/random-note" element={<RandomNote />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

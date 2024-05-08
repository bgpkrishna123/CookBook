import { Route, Routes } from "react-router-dom";
import Home from "../page/Home";

export const AllRoutes = () => {
    return (
      <Routes>
        <Route path="/home" element={<Home/>} />
      </Routes>
    );
  };
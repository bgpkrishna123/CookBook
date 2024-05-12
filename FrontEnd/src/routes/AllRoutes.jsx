import { Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import LoginPage from "../page/Login";
import RecipeData from './../Components/RecipeData';

export const AllRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login-signup" element={<LoginPage/>} />
        <Route path="/recipe-data/:id" element={<RecipeData />} /> 
      </Routes>
    );
};

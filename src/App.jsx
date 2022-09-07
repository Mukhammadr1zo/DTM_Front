import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";
import Register from "./Pages/Authorization/Register";
import Login from "./Pages/Authorization/Login";
import Subject from "./Components/Subject";
import DirectionPage from "./Pages/DirectionPage";
import Tests from "./Pages/Tests";
import Score from "./Components/Score";
import Students from "./Components/Students";
import Results from "./Pages/Results";
import Redirect from "./Components/Redirect";
import { store } from './Redux/store'
import NavbarLayout from "./Components/Navbar";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavbarLayout />}>
            <Route path="" element={<Layout />}>
              <Route path="" element={<Redirect />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="subject" element={<Subject />} />
              <Route path="direction" element={<DirectionPage />} />
            </Route>
            <Route path="tests" element={<Tests />} />
            <Route path="score/:result_id" element={<Score />} />
            <Route path="students" element={<Students />} />
            <Route path="results" element={<Results />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

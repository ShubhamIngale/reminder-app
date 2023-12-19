import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { MainContext } from "./utils/context";
import Login from "./pages/Login";
import Reminders from "./pages/Reminders";
import Header from "./components/Header";

function App() {
  const { token, setToken } = useContext(MainContext);
  return (
    <div style={{height: "100vh", maxWidth: "400px", margin: "0 auto"}}>
      <Header token={token} setToken={setToken} />
      {
        token ?
        <Routes>
          <Route path="/" exact element={<Reminders />} />
          <Route path="*" exact element={<Reminders/>} />
        </Routes> :
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="*" exact element={<Login />} />
        </Routes>
      }
    </div>
  );
}

export default App;

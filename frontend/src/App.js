import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Route, Router, Routes } from "react-router-dom";
import { MainContext } from "./utils/context";
import Login from "./pages/Login";
import { Button, Col, Row, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

function App() {
  const { token, setToken } = useContext(MainContext);
  return (
    <div style={{height: "100vh"}}>
      <div 
        className="header"
        style={{
          padding: "16px 10%",
          background: "#E7E7E7"
        }}
      >
        <Row>
          <Col span={6}>
            <h2>Reminders</h2>
          </Col>
          <Col span={18} style={{textAlign: "right"}}>
            {
              token && token?.length > 0 &&
              <>
              <Button
                type="default"
                style={{marginLeft: "auto"}}
                icon={<PlusOutlined />}
              >
                New Reminder
              </Button>
              <Button
                type="link"
                onClick={() => {
                  setToken("");
                  message.success("Logged out successfully!")
                }}
              >
                Logout
              </Button>
              </>
            }
          </Col>
        </Row>
      </div>
      {
        token ?
        <Routes>
          <Route path="/" exact element={<>Reminders</>} />
          <Route path="*" exact element={<>Reminders</>} />
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

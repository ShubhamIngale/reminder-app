import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import { MainContextProvider } from './utils/context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#144EE3',
        },
      }}
    >
    <MainContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MainContextProvider>
  </ConfigProvider>
);

reportWebVitals();

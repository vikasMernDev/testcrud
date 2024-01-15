import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Register from './components/register/Register';
import Login from './components/login/Login';
import PrivateRoute from './components/routes/PrivateRoute';
import Add from './pages/Add';
import Update from './pages/Update';
import Home from './pages/Home';

function App(): JSX.Element {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route
            path="/private"
            element={<PrivateRoute />}
          >
            <Route path="login" element={<Login />} />
            <Route  path="home" element={<Home />} />
            <Route  path="update/:id" element={<Update />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;

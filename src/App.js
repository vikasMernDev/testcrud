import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register/Register";
import { MantineProvider } from "@mantine/core";
import Login from "./components/login/Login";
import PrivateRoute from "./components/routes/PrivateRoute";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Home from "./pages/Home";



function App() {
  return (
    <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />}></Route>
            <Route
              path="/private"
              element={<PrivateRoute />}
            >
              <Route path="login" element={<Login />}></Route>
              <Route path="create-user" element={<Add/>} />
              <Route exact path="home" element={<Home/>} />
              <Route exact path="update/:id" element={<Update/>} />
            </Route>
          </Routes>
        </BrowserRouter>
    </MantineProvider>
  );
}

export default App;

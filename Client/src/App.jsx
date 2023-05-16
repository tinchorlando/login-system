import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import RequireAuthUser from "./components/requireAuthUser.jsx";
import Profile from "./pages/profile.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import ResetPassword from "./pages/resetPassword";
function App() {
  return (
    <div id="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<RequireAuthUser />}>
          <Route path="/profile/" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password/:id/:code" element={<ResetPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;

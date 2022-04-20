import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Reviews from "./screens/Reviews";
import Pricing from "./screens/Pricing";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import NoMatch from "./screens/NoMatch";
import UnAuthorized from "./screens/UnAuthorized";
import Admin from "./screens/Admin";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="login" element={<SignIn />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route exact path="unauthorized" element={<UnAuthorized />} />

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route exact path="reviews" element={<Reviews />} />
          <Route exact path="pricing" element={<Pricing />} />
          <Route exact path="admin" element={<Admin />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;

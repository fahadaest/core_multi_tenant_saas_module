import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import SignIn from "./pages/AuthPages/SignIn";
import RegisterCompany from "./pages/AuthPages/RegisterCompany";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CompanyRoutesWrapper from "./routes/CompanyRoutesWrapper";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:company/*" element={<CompanyRoutesWrapper />} />

        <Route path="/" element={<AppLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
        <Route path="/signin" element={<SignIn page="signInWithAdmin" />} />
        <Route path="/registerYourCompany" element={<RegisterCompany page="registerCompany" />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

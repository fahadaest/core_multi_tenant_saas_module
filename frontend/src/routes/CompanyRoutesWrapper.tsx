import { useParams, Routes, Route } from "react-router-dom";
import Home from "../pages/Dashboard/Home";
import UserProfiles from "../pages/UserProfiles";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import NotFound from "../pages/OtherPage/NotFound";
import AppLayout from "../layout/AppLayout";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export default function CompanyRoutesWrapper() {
    const { company } = useParams();

    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route element={<ProtectedRoute />}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<UserProfiles />} />
                </Route>
            </Route>

            <Route path="signin" element={<SignIn page="signInWithAdmin" company={company} />} />
            <Route path="signup" element={<SignUp company={company} />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

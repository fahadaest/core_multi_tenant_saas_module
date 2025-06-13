import { useParams, Routes, Route } from "react-router-dom";
import Home from "../pages/Dashboard/Home";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import NotFound from "../pages/OtherPage/NotFound";
import AppLayout from "../layout/AppLayout";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { setTenantDomain } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/hooks";
import { useEffect } from "react";

export default function CompanyRoutesWrapper() {
    const dispatch = useAppDispatch();
    const { company } = useParams();
    useEffect(() => {
        if (company) {
            dispatch(setTenantDomain(company.toLowerCase()));
        }
    }, [company]);

    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route element={<ProtectedRoute />}>
                    <Route index element={<Home />} />
                </Route>
            </Route>

            <Route path="signin" element={<SignIn page="signInWithAdmin" company={company} />} />
            <Route path="signup" element={<SignUp company={company} />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

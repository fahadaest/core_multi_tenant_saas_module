import { Navigate, Outlet, useParams, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const ProtectedRoute: React.FC = () => {
    const { user, loading } = useAppSelector((state) => state.auth);
    const { company } = useParams();
    const location = useLocation();

    if (loading) return null;

    if (!user) {
        const redirectTo = company ? `/${company}/signin` : "/signin";
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    return <Outlet />;
};


export default ProtectedRoute;
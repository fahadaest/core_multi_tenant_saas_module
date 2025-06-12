import { Navigate, Outlet, useParams, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const ProtectedRoute: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);
    const { company } = useParams();
    const location = useLocation();

    if (!user) {
        const redirectTo = company ? `/${company}/signin` : "/signin";
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
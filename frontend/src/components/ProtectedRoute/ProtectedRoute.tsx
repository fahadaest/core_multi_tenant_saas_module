import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../redux/hooks";

const ProtectedRoute: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

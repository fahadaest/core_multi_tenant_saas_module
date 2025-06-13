import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setUser, setLoading, setError } from "../redux/slices/userSlice";
import { useGetCurrentUserQuery } from "../redux/slices/authSlice";

const AppInitializer = () => {
    const dispatch = useAppDispatch();
    const query = useGetCurrentUserQuery();

    useEffect(() => {
        dispatch(setLoading(query.isLoading));

        if (query.data) {
            dispatch(setUser(query.data));
        }

        if (query.isError) {
            dispatch(setError("Session expired or unauthenticated."));
        }
    }, [query, dispatch]);

    return null;
};

export default AppInitializer;

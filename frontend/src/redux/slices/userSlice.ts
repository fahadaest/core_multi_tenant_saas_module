import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
    tenantDomain: string;
}

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
    tenantDomain: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.error = null;
        },
        clearUser(state) {
            state.user = null;
            state.isLoggedIn = false;
            state.error = null;
            state.tenantDomain = '';
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        setTenantDomain(state, action: PayloadAction<string>) {
            state.tenantDomain = action.payload;
        },
    },
});

export const { setUser, clearUser, setLoading, setError, setTenantDomain, } = authSlice.actions;

export default authSlice.reducer;
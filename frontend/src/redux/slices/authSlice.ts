import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
interface LoginRequest {
    email: string;
    password: string;
}
interface LoginResponse {
    token: string;
    user: {
        _id: string;
        name: string;
        email: string;
        role: string;
    };
}
interface RegisterUserResponse {
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        tenantId: string;
    };
}

interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
    domain: string;
}

interface GoogleSignupRequest {
    tokenId: string;
    domain: string;
}

interface GoogleSignupResponse {
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        tenantId: string;
    };
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const tenantDomain = state.auth.tenantDomain;

            if (tenantDomain) {
                headers.set('X-Tenant-Domain', tenantDomain);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'api/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        registerTenant: builder.mutation({
            query: (data) => ({
                url: 'api/tenants/register',
                method: 'POST',
                body: data,
            }),
        }),
        getCurrentUser: builder.query<LoginResponse['user'], void>({
            query: () => ({
                url: 'api/auth/user',
                method: 'GET',
            }),
        }),
        registerUser: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
            query: (userData) => ({
                url: 'api/register-user',
                method: 'POST',
                body: userData,
            }),
        }),
        googleSignup: builder.mutation<GoogleSignupResponse, GoogleSignupRequest>({
            query: (data) => ({
                url: 'auth/google-signup',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterTenantMutation, useGetCurrentUserQuery, useRegisterUserMutation, useGoogleSignupMutation } = authApi;
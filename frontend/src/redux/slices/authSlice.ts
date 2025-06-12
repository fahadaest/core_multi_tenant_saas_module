import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
        tenantId: string | null;
    };
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include',
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
    }),
});

export const { useLoginMutation, useRegisterTenantMutation } = authApi;
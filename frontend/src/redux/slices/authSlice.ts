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
    }),
});

export const { useLoginMutation, useRegisterTenantMutation, useGetCurrentUserQuery } = authApi;
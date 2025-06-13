import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
interface Tenant {
    _id: string;
    name: string;
    email: string;
    domain: string;
    industry: string;
}
interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    tenantId: string | null;
}

interface AdminDataResponse {
    tenants: Tenant[];
    users: User[];
}

export const appApi = createApi({
    reducerPath: 'appApi',
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
        getTenantUsers: builder.query<User[], void>({
            query: () => ({
                url: 'api/auth/tenant/users',
                method: 'GET',
            }),
        }),
        getAllTenantsAndUsers: builder.query<AdminDataResponse, void>({
            query: () => ({
                url: 'api/auth/getAllTenantsAndUsers',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetTenantUsersQuery, useGetAllTenantsAndUsersQuery } = appApi;
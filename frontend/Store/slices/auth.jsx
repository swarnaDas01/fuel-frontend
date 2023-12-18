//authQueries
import { BASE_URL } from '@/pages/api/Api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const auth = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            // Get the token from localStorage
            const token = localStorage.getItem('token');
            if (token !== null && token !== undefined) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (newUser) => ({
                url: '/user/register',
                method: 'POST',
                body: newUser,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/user/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/user/logout',
                method: 'POST',
            }),
        }),
        allUsers: builder.query({
            query: () => '/users',
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useAllUsersQuery,
    useLogoutMutation,
} = auth;

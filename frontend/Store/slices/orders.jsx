//OrderApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from "@/pages/api/Api";

export const orderAPI = createApi({
    reducerPath: 'orderAPI',
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
        allorders: builder.query({
            query: () => '/orders',
        }),
        // confirmOrder: builder.mutation({
        //     query: ({ id, status }) => ({
        //         url: `/supplier/confirmOrder/${id}`,
        //         method: 'PUT',
        //         body: status,
        //     }),
        // }),
        updateOrder: builder.mutation({
            query: ({ id, order }) => ({
                url: `/order/${id}`,
                method: 'PUT',
                body: order,
            }),
        }),
    }),
});

export const {
    useUpdateOrderMutation,
    useAllordersQuery,
} = orderAPI;


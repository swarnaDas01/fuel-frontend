//supplier
import { BASE_URL } from '@/pages/api/Api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const supplier = createApi({
    reducerPath: 'supplier',
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
        allStock: builder.query({
            query: () => '/supplier/stock/all',
        }),
        singleStock: builder.query({
            query: (id) => `/supplier/stock/${id}`,
        }),
        addStock: builder.mutation({
            query: (stock) => ({
                url: '/supplier/stock/add',
                method: 'POST',
                body: stock,
            }),
        }),
        updateStock: builder.mutation({
            query: ({ id, stock }) => ({
                url: `/supplier/stock/update/${id}`,
                method: 'PUT',
                body: stock,
            }),
        }),
        deleteStock: builder.mutation({
            query: (id) => ({
                url: `/supplier/stock/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        confirmOrder: builder.mutation({
            query: ({ id, status }) => (
                console.log("builder --------- ", id, status),
                {
                    url: `/supplier/confirmOrder/${id}`,
                    method: 'PUT',
                    body: status,
                }),
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/supplier/deleteOrder/${id}`,
                method: 'DELETE',
            }),
        }),
        allmonthlySales: builder.mutation({
            query: () => ({
                url: `/supplier/monthlySales/all`,
                method: 'GET',
            }),
        }),
        getAllSupplierNotification: builder.query({
            query: () => '/supplier/notifications',
        }),
        deleteSupplierNotification: builder.mutation({
            query: (id) => ({
                url: `/supplier/notification/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useAllStockQuery,
    useSingleStockQuery,
    useAddStockMutation,
    useUpdateStockMutation,
    useDeleteStockMutation,
    useConfirmOrderMutation,
    useDeleteOrderMutation,
    useAllmonthlySalesMutation,
    useGetAllSupplierNotificationQuery,
    useDeleteSupplierNotificationMutation
} = supplier;


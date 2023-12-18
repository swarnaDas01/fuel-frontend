//admin slice
import { BASE_URL } from '@/pages/api/Api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const admin = createApi({
    reducerPath: 'admin',
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
        allStationStock: builder.query({
            query: () => '/station/stock/all',
        }),
        singleStationStock: builder.query({
            query: (id) => `/station/stock/${id}`,
        }),
        addStationStock: builder.mutation({
            query: (stock) => ({
                url: '/station/stock/add',
                method: 'POST',
                body: stock,
            }),
        }),
        updateStationStock: builder.mutation({
            query: ({ id, stock }) => ({
                url: `/station/stock/update/${id}`,
                method: 'PUT',
                body: stock,
            }),
        }),
        deleteStationStock: builder.mutation({
            query: (id) => ({
                url: `/station/stock/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        deleteOrderStation: builder.mutation({
            query: (id) => ({
                url: `/supplier/deleteOrder/${id}`,
                method: 'DELETE',
            }),
        }),

        allmonthlySalesStation: builder.mutation({
            query: () => ({
                url: `/station/monthlySales/all`,
                method: 'GET',
            }),
        }),
        addSale: builder.mutation({
            query: (sale) => ({
                url: `/sales/add`,
                method: 'POST',
                body: sale,
            }),
        }),
        allSales: builder.mutation({
            query: () => ({
                url: `/sales/all`,
                method: 'GET',
            }),
        }),
        singleSale: builder.mutation({
            query: (id) => ({
                url: `/sales/${id}`,
                method: 'GET',
            }),
        }),
        updateSale: builder.mutation({
            query: ({ id, sale }) => ({
                url: `/sales/${id}`,
                method: 'PUT',
                body: sale,
            }),
        }),
        deleteSale: builder.mutation({
            query: (id) => ({
                url: `/sales/${id}`,
                method: 'DELETE',
            }),
        }),

        allSuppliers: builder.mutation({
            query: () => ({
                url: `/supplier/all`,
                method: 'GET',
            }),
        }),
        allOrderToSuppliers: builder.mutation({
            query: () => ({
                url: `/ordertosupplier/all`,
                method: 'GET',
            }),
        }),
        addOrderToSupplier: builder.mutation({
            query: (order) => ({
                url: `/ordertosupplier/add`,
                method: 'POST',
                body: order,
            }),
        }),
        updateOrderToSupplier: builder.mutation({
            query: ({ id, newData }) => ({
                url: `/ordertosupplier/update/${id}`,
                method: 'PUT',
                body: newData,
            }),
        }),
        deleteOrderToSupplier: builder.mutation({
            query: (id) => ({
                url: `/ordertosupplier/delete/${id}`,
                method: 'DELETE',
            }),
        }),

        allFuelStations: builder.mutation({
            query: () => ({
                url: `/station/all`,
                method: 'GET',
            }),
        }),

    }),
});


export const {
    useAllStationStockQuery,
    useSingleStationStockQuery,
    useAddStationStockMutation,
    useUpdateStationStockMutation,
    useDeleteStationStockMutation,
    useDeleteOrderStationMutation,
    useAllmonthlySalesStationMutation,

    useAddSaleMutation,
    useAllSalesMutation,
    useSingleSaleMutation,
    useUpdateSaleMutation,
    useDeleteSaleMutation,

    useAllSuppliersMutation,

    useAllOrderToSuppliersMutation,
    useAddOrderToSupplierMutation,
    useUpdateOrderToSupplierMutation,
    useDeleteOrderToSupplierMutation,

    useAllFuelStationsMutation,

} = admin;


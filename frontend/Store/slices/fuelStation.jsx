//supplier
import { BASE_URL } from '@/pages/api/Api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const fuelStation = createApi({
    reducerPath: 'fuelStation',
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
        getAllNotification: builder.query({
            query: () => '/notifications',
        }),
        deleteNotification: builder.mutation({
            query: (id) => ({
                url: `/notifications/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});


export const { useGetAllNotificationQuery, useDeleteNotificationMutation } = fuelStation;


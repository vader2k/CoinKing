import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoHeaders = {
    'X-RapidAPI-Key': import.meta.env.VITE_CRYPTO_API_KEY,
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'

}

const baseUrl = "https://coinranking1.p.rapidapi.com/"

const createRequest = (url) => ({ url, headers:cryptoHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`coins/?limit=${count}`)
        }),
        getCoinDetails: builder.query({
            query: (id) => createRequest(`coin/${id}`)
        }),
        getCoinHistory: builder.query({
            query: ({ id, timePeriod }) => createRequest(`coin/${id}/history?timePeriod=${timePeriod}`)
        }),
        getStats: builder.query({
            query: () => createRequest(`stats`)
        })    
    })
})

export const { useGetCryptosQuery, useGetCoinDetailsQuery, useGetCoinHistoryQuery, useGetStatsQuery } = cryptoApi;
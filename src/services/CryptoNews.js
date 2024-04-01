import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const newsHeader = {
    'X-RapidAPI-Key': import.meta.env.VITE_CRYPTO_API_KEY,
    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
}

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com/'

const createRequest = (url) => ({ url, headers:newsHeader})

// Define a service using a base URL and expected endpoints

export const cryptoNews = createApi({
  reducerPath: 'cryptoNews',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getNews: builder.query({
        query: (source) => createRequest(`v1/${source}`)
    })
  })
})

export const { useGetNewsQuery } = cryptoNews;
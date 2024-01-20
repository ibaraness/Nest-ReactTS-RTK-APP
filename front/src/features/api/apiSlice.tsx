import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Our base URL for all api calls
const baseURL = "http://localhost:3000";

// Creating a single API base which we use for all of our API calls, 
// the actual endpoints which extends this base are in the feature slices
export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({ baseUrl:baseURL }),
    tagTypes: ['Post'],
    endpoints: _ => ({})
})
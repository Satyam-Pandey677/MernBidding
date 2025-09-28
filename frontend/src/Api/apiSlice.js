import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { BASE_URl } from "../constant"


const  baseQuery = fetchBaseQuery({baseUrl:BASE_URl});

export const apiSlice = createApi({
    baseQuery,
    tagTypes:["User", "Product"],
    endpoints: () => ({})
})
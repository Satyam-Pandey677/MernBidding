import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constant";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        register : builder.mutation({
            query:(data) => ({
                url: `${USER_URL}`,
                method:"POST",
                body:data
            })
        }),
    })
})

export const { useRegisterMutation } = userApiSlice
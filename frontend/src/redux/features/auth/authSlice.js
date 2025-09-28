import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userinfo")): null
}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:
})
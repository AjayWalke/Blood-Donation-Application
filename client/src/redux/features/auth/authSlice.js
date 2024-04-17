import { bindActionCreators, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "./authAction";
const token = localStorage.getItem('token') ? localStorage.getItem('token') : null; // inital token directly get form local device
const initialState = {
    loading:false,
    user:null,
    token,
    error:null,
}
const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{},
    extraReducers: (builder) => {


        // create the status pending, fulfilled -----   userLogin   -----------
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        // why payload because we have the data coming
        builder.addCase(userLogin.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.user = payload.user; 
            state.token = payload.token
        })
        builder.addCase(userLogin.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload
        })


        // create for the --------------  userRegister -------------
        
        builder.addCase(userRegister.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        builder.addCase(userRegister.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.success = true;
            state.user = payload.user
        })

        builder.addCase(userRegister.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload
        })

        // -----------------  get current user

        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        builder.addCase(getCurrentUser.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.success = true;
            state.user = payload.user;
        })

        builder.addCase(getCurrentUser.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload
        })
    }
})
export default authSlice;
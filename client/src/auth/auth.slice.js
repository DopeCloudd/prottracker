import {createSlice} from '@reduxjs/toolkit'
import {registerUser, loginUser} from './auth.actions'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
    loading: false,
    userInfo: null,
    userToken: userToken,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken')
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
        },
        setCredentials: (state, {payload}) => {
            state.userInfo = payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, {payload}) => {
                state.loading = false
                state.userInfo = payload
                state.userToken = payload.accessToken
                localStorage.setItem('userToken', payload.accessToken)
            })
            .addCase(loginUser.rejected, (state, {payload}) => {
                state.loading = false
                state.error = payload
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, {payload}) => {
                state.loading = false
                state.success = true // registration successful
            })
            .addCase(registerUser.rejected, (state, {payload}) => {
                state.loading = false
                state.error = payload
            })
    },
})

export const {logout, setCredentials} = authSlice.actions
export default authSlice.reducer
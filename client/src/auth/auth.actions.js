import axios from 'axios'
import {createAsyncThunk} from '@reduxjs/toolkit'

const API = 'http://localhost:3032'

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({name, firstName, email, password}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(
                `${API}/auth/signup`,
                {name, firstName, email, password},
                config
            )
        } catch (error) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({email, password}, {rejectWithValue}) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const {data} = await axios.post(
                `${API}/auth/signin`,
                {email, password},
                config
            )
            // store user's token in local storage
            localStorage.setItem('userToken', data.userToken)
            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
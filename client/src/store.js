import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import {authApi} from './auth/auth.service'

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})
export default store
import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './Slices/AuthSlice'


const store = configureStore({
    reducer: {
        Auth: AuthSlice.reducer
    }
})

export default store
import { createSlice } from '@reduxjs/toolkit'
const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState: {
        User: {}
    },
    reducers: {

    }
})

export const AuthAction = AuthSlice.actions

export default AuthSlice
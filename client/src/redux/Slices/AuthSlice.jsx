// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'
// import { Base_url, request } from '../RequestUrl'

// export const LoginThunk = createAsyncThunk('Login', async ({ credential, password }) => {
//     try {
//         console.log('data : ', credential, ' ', password)
//         const response = await axios.post(`${Base_url}${request.login}`, { credentials: credential, password }, {
//             withCredentials: true,
//             credentials: 'include'
//         })
//         console.log('result : ', response)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response?.data || error.message || "An error occurred");
//     }
// })

// export const LogoutThunk = createAsyncThunk('Logout', async () => {
//     try {
//         const response = await axios.post(`${Base_url}${request.logout}`, {}, {
//             withCredentials: true,
//         })
//         console.log('result : ', response)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response?.data || error.message || "An error occurred");
//     }
// })

// const AuthSlice = createSlice({
//     name: 'AuthSlice',
//     initialState: {
//         User: {},
//         isLoading: false,
//         isError: false,
//         Errormsg: "",
//         isLoggedin: false,
//         isLoggedout: false
//     },
//     reducers: {


//     },
//     extraReducers: (builder) => {
//         //Login
//         builder.addCase(LoginThunk.pending, (state, action) => {
//             state.isError = false
//             state.isLoading = true
//             state.Errormsg = ""
//             state.isLoggedin = false
//             state.isLoggedout = false
//         })
//         builder.addCase(LoginThunk.fulfilled, (state, action) => {
//             state.User = action.payload
//             state.isLoggedin = true
//             state.isLoggedout = false
//             state.isError = false
//             state.Errormsg = ""
//             state.isLoading = false
//         })
//         builder.addCase(LoginThunk.rejected, (state, action) => {
//             state.isError = true
//             state.isLoading = false
//             state.Errormsg = action.payload
//             state.isLoggedin = false
//             state.isLoggedout = false
//         })

//         //logout
//         builder.addCase(LogoutThunk.pending, (state, action) => {
//             state.isError = false
//             state.isLoading = true
//             state.Errormsg = ""
//             state.isLoggedin = false
//             state.isLoggedout = false
//         })
//         builder.addCase(LogoutThunk.fulfilled, (state, action) => {
//             state.isLoggedin = false
//             state.isLoggedout = true
//             state.isLoading = false
//             state.User = {}
//             state.isError = false
//             state.Errormsg = ""
//         })
//         builder.addCase(LogoutThunk.rejected, (state, action) => {
//             state.isError = true
//             state.isLoading = false
//             state.Errormsg = action.payload
//             state.isLoggedin = false
//             state.isLoggedout = false
//         })
//     }
// })

// export const AuthAction = AuthSlice.actions

// export default AuthSlice










import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Base_url, request } from '../RequestUrl'

// Login thunk
export const LoginThunk = createAsyncThunk('Login', async ({ credential, password }) => {
    try {
        console.log('data : ', credential, ' ', password)
        const response = await axios.post(`${Base_url}${request.login}`, { credentials: credential, password }, {
            withCredentials: true,
            credentials: 'include'
        })
        console.log('result : ', response)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || "An error occurred");
    }
})

// Logout thunk
export const LogoutThunk = createAsyncThunk('Logout', async () => {
    try {
        const response = await axios.post(`${Base_url}${request.logout}`, {}, {
            withCredentials: true,
        })
        console.log('result : ', response)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || "An error occurred");
    }
})

const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState: {
        User: {},
        isLoading: false,
        isError: false,
        Errormsg: "",
        isLoggedin: false,
        isLoggedout: false
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handle Login
        builder.addCase(LoginThunk.pending, (state) => {
            state.isError = false
            state.isLoading = true
            state.Errormsg = ""
            state.isLoggedin = false
            state.isLoggedout = false
        })
        builder.addCase(LoginThunk.fulfilled, (state, action) => {
            state.User = action.payload
            state.isLoggedin = true
            state.isLoggedout = false
            state.isError = false
            state.Errormsg = ""
            state.isLoading = false
        })
        builder.addCase(LoginThunk.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.Errormsg = action.payload
            state.isLoggedin = false
            state.isLoggedout = false
        })

        // Logout extraReducer
        builder.addCase(LogoutThunk.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.Errormsg = "";
            state.isLoggedin = false;
            state.isLoggedout = false;
            state.User = {};
        });
        builder.addCase(LogoutThunk.fulfilled, (state) => {
            state.isLoggedin = false;
            state.isLoggedout = true;
            state.isLoading = false;
            state.User = {};
            state.isError = false;
            state.Errormsg = "";
        });
        builder.addCase(LogoutThunk.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.Errormsg = action.payload;
            state.isLoggedin = false;
            state.isLoggedout = false;
        });
    }
})

export const AuthAction = AuthSlice.actions

export default AuthSlice

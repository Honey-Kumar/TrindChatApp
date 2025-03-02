import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Base_url, request } from '../RequestUrl'
import Cookies from 'js-cookie'

export const LoginThunk = createAsyncThunk('Login', async ({ credential, password }) => {
    try {
        console.log('data : ', credential, ' ', password)
        const response = await axios.post(`${Base_url}${request.login}`, { credentials: credential, password }, {
            withCredentials: true,
            credentials: 'include'
        })
        console.log('result : ', response)
        await Cookies.set('authtoken', response.data.token)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || "An error occurred");
    }
})

export const LogoutThunk = createAsyncThunk('Logout', async () => {
    try {
        const response = await axios.post(`${Base_url}${request.logout}`, {}, {
            withCredentials: true,
            credentials: 'include'
        })
        console.log('result : ', response)
        await Cookies.remove('authtoken')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || "An error occurred");
    }
})

export const RegisterThunk = createAsyncThunk('Register', async (data) => {
    console.log("data : ", data)
    try {
        const response = await axios.post(`${Base_url}${request.register}`, data, {
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        console.log('result : ', response)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || "An error occurred");
    }
})


export const forgetPasswordThunk = createAsyncThunk('Forgetpassword', async (data) => {
    console.log("data : ", data)
    try {
        const response = await axios.post(`${Base_url}${request.forgetpassword}`, data, {
            withCredentials: true,
            credentials: 'include'
        })
        console.log('result : ', response)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message || "An error occurred");
    }
})


export const resetPasswordThunk = createAsyncThunk('Resetpassword', async (data) => {
    console.log("data : ", data)
    try {
        const response = await axios.post(`${Base_url}${request.resetpassword}`, data, {
            withCredentials: true,
            credentials: 'include'
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
        isLoggedout: false,
        isRegister: false,
        isForget: false,
        isReset: false
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
            state.isRegister = false;
            state.isForget = false
            state.isReset = false
        })
        builder.addCase(LoginThunk.fulfilled, (state, action) => {
            state.User = action.payload
            state.isLoggedin = true
            state.isLoggedout = false
            state.isError = false
            state.Errormsg = ""
            state.isLoading = false
            state.isRegister = false;
            state.isForget = false
            state.isReset = false
        })
        builder.addCase(LoginThunk.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.Errormsg = action.payload
            state.isLoggedin = false
            state.isLoggedout = false
            state.isRegister = false;
            state.isForget = false
            state.isReset = false
        })

        // Logout extraReducer
        builder.addCase(LogoutThunk.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.Errormsg = "";
            state.isLoggedin = false;
            state.isLoggedout = false;
            state.User = {};
            state.isRegister = false;
            state.isForget = false
            state.isReset = false
        });
        builder.addCase(LogoutThunk.fulfilled, (state) => {
            state.isLoggedin = false;
            state.isLoggedout = true;
            state.isLoading = false;
            state.User = {};
            state.isError = false;
            state.Errormsg = "";
            state.isRegister = false;
            state.isForget = false
            state.isReset = false
        });
        builder.addCase(LogoutThunk.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.Errormsg = action.payload;
            state.isLoggedin = false;
            state.isRegister = false;
            state.isLoggedout = false;
            state.isForget = false
            state.isReset = false
        });

        //Register extraReducer
        builder.addCase(RegisterThunk.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.Errormsg = "";
            state.isLoggedin = false;
            state.isLoggedout = false;
            state.User = {};
            state.isRegister = false;
            state.isForget = false
            state.isReset = false
        });
        builder.addCase(RegisterThunk.fulfilled, (state, action) => {
            state.isLoggedin = false;
            state.isLoggedout = false;
            state.isLoading = false;
            state.User = action.payload;
            state.isError = false;
            state.isRegister = true;
            state.isForget = false
            state.isReset = false
            state.Errormsg = "";
        });
        builder.addCase(RegisterThunk.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.Errormsg = action.payload;
            state.isLoggedin = false;
            state.isLoggedout = false;
            state.isRegister = false;
            state.isForget = false
            state.isReset = false
        });

        //Forget extraReducer
        builder.addCase(forgetPasswordThunk.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.Errormsg = "";
            state.isLoggedin = false;
            state.isLoggedout = false;
            state.User = {};
            state.isRegister = false;
            state.isForget = false
            state.isReset = false
        });
        builder.addCase(forgetPasswordThunk.fulfilled, (state, action) => {
            state.isLoggedin = false;
            state.isLoggedout = false;
            state.isLoading = false;
            state.User = action.payload;
            state.isError = false;
            state.isRegister = false;
            state.isForget = true
            state.isReset = false
            state.Errormsg = "";
        });
        builder.addCase(forgetPasswordThunk.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.Errormsg = action.payload;
            state.isLoggedin = false;
            state.isLoggedout = false;
            state.isRegister = false;
            state.isForget = false
            state.isReset = false
        });

        //Reset password extraReducer
        builder.addCase(resetPasswordThunk.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
            state.Errormsg = "";
            state.isLoggedin = false;
            state.isLoggedout = false;
            state.User = {};
            state.isRegister = false;
            state.isForget = false
            state.isReset = false
        });
        builder.addCase(resetPasswordThunk.fulfilled, (state, action) => {
            state.isLoggedin = false;
            state.isLoggedout = false;
            state.isLoading = false;
            state.User = action.payload;
            state.isError = false;
            state.isRegister = false;
            state.isForget = false
            state.isReset = true
            state.Errormsg = "";
        });
        builder.addCase(resetPasswordThunk.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.Errormsg = action.payload;
            state.isLoggedin = false;
            state.isLoggedout = false;
            state.isRegister = false;
            state.isForget = false
            state.isReset = false
        });

    }
})

export const AuthAction = AuthSlice.actions

export default AuthSlice

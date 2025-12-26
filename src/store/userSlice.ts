// store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE } from '@/utils/constants';
import { adduserToSession as addUserToSessionUtil, removeuserFromSession as removeUserFromSessionUtil, isUserInSession as isUserInSessionUtil } from '@/utils/auth';
import type { UserState, LoginCredentials } from '@/types';

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  otpSended: false,
  otpCode: null , 
  resetEmail: null, 
  isPasswordChanged : false , 
  isLogin : false 
};

// ✅ Step 1: create async thunk for login
 const login = createAsyncThunk(
  'user/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue  }
  ) => {
    try {
      const res = await axios.post(`${API_BASE}/admin/auth/login`, credentials);
      return res.data;
    } catch (error: any) {
      let message = 'Login failed. Please try again.';
      if (axios.isAxiosError(error)) {
        message = (error.response?.data as any)?.message || error.message || message;
      }
      return rejectWithValue({ message });
    }
  }
);

const resetPassword = createAsyncThunk( 
  "user/resetPassword",
  async (
    emailData: { email: string },
    { rejectWithValue }
  ) => {
    try {
      // Fire-and-forget reset request
      await axios.post(`${API_BASE}/admin/auth/forget-password`, emailData);
      return { email: emailData.email };
    } catch (error: any) {
      let message = 'Password reset failed. Please try again later.';
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 404) message = 'User not found';
        else message = (error.response?.data as any)?.message || error.message || message;
      }
      return rejectWithValue({ message });
    }
  }
);

const newPassword = createAsyncThunk( 
  "user/newPassword",
  async (
    emailData: { email: string , password : string , otp : string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_BASE}/admin/auth/reset-password`, emailData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error: any) {
      let message = 'Failed to set new password.';
      if (axios.isAxiosError(error)) {
        message = (error.response?.data as any)?.message || error.message || message;
      }
      return rejectWithValue({ message });
    }
  }
);

// ✅ Step 2: handle async states in reducers
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      removeUserFromSessionUtil()

    },
    resetOtpStatus (state ) {
      state.otpSended = false;
    }
    ,
    otpSent (state , action) {
        state.otpCode = action.payload

    },
    resetErrors (state ) {
      state.error = null
    }
    , 
    resetAll (state ) {
      state.otpCode = null
      state.resetEmail = null
      state.isPasswordChanged = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        addUserToSessionUtil(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as {message : string}).message;
        removeUserFromSessionUtil()
      }).addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSended = true;
        state.resetEmail = action.payload.email as string;
       
        // Future: handle successful password reset if needed
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as {message : string}).message;
      }).addCase(newPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isPasswordChanged = true 
        state.otpCode = null

        // Future: handle successful new password if needed
      })
      .addCase(newPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as {message : string}).message;
        state.otpCode = null
      });
  },
});

 const { logout , resetOtpStatus ,resetErrors,  resetAll ,  otpSent } = userSlice.actions;
export default userSlice.reducer;

export { login, logout  , resetPassword , resetErrors  , resetAll , resetOtpStatus , newPassword, otpSent };

// Re-export auth utilities for backwards compatibility
export { adduserToSession, removeuserFromSession, isUserInSession } from '@/utils/auth';
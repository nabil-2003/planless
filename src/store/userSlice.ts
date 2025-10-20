// store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use NEXT_PUBLIC_API_URL on client; fall back to the public API host.
// Normalize to remove any trailing slash so templating is predictable.
const API_BASE = (process.env.NEXT_PUBLIC_API_URL )
type User = any | null;

type UserState = {
  user: User;
  loading: boolean;
  error: string | null;
  otpSended?: boolean | null;
  otpCode? : string | null ;
  resetEmail? : string  |null
  isPasswordChanged:boolean 
  isLogin  : boolean
};

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
      const  res = await axios.post(`${API_BASE}/admin/auth/login` , credentials )
      return res.data
    } catch (error: any) {
      return rejectWithValue({message : error.message});
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
      console.log('Dispatching resetPassword for:', emailData);
   
      const  res = await axios.post(`${API_BASE}/admin/auth/forget-password`, emailData, {
      });
      
      console.log('res')
      console.log(res)
      return {  email : emailData.email };
    } catch (error: any) {
        if(error.status){
      return rejectWithValue({message : "user not found" });
        }
      return rejectWithValue({message : "you can try again later" });
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
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
 

   return response.data
    } catch (error: any) {
      return rejectWithValue({message : error.message });
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
      removeuserFromSession()

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
        adduserToSession(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as {message : string}).message;
        removeuserFromSession()
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

export const adduserToSession = (userData: any) => {
  sessionStorage.setItem('user', JSON.stringify(userData));
}
export const removeuserFromSession = ( ) => {
  sessionStorage.removeItem('user');
}

export const isUserInSession = () : boolean => ( sessionStorage.getItem('user') !== null )
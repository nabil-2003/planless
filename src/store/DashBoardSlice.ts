import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE, getToken } from "@/utils";
import type { DashboardState } from "@/types";

const initialState: DashboardState = {
    statistics : null as any,
    charts : null as any,
    loading : false,
    error : null as string | null,
}

const fetchStatistics = createAsyncThunk('dashboard/fetchStatistics',
    async (days :number = 20, {rejectWithValue})=>{
        try{
         
            if (getToken() == null ) 
              
                return rejectWithValue("logged first");
                   console.log("Fetching statistics for days: ", days)
            const response = await  axios.get(API_BASE+"/admin/overview/statistics?days="+days , {
                headers : {
                    Authorization : `Bearer ${getToken()}`
                }
            }
            );
            return response.data;
        }catch(error:any){
            return rejectWithValue(error.messageForbidden);
        }
    }
)

const dashboard  = createSlice({
    name : "dashboard",
    initialState : initialState ,
    reducers : {
        setLoading(state, action){
            state.loading = action.payload;
        },
        setError(state, action){
            state.error = action.payload ?? null;
            state.loading = false;
        },
       
    }
,    extraReducers : (builder)=>{
        builder.addCase(fetchStatistics.pending , (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchStatistics.fulfilled , (state, action)=>{
            state.loading = false;
            
            state.statistics = action.payload;
        }).addCase(fetchStatistics.rejected , (state, action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })
    }
 

  
})
export const {  setLoading, setError } = dashboard.actions;
export { fetchStatistics };
export default dashboard.reducer;
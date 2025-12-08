import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import { get } from "http";
const API_BASE = (
  (process.env.NEXT_PUBLIC_API_URL as string) 
).replace(/\/$/, '');


const initialState = {
    instructors : [] as Array<any>,
    instructor : null as any,
    planning : [] as any,
    loading : false,
    error : null as string | null,
    indexPage : 0 as number ,
    pageSize : 10 as number ,
    total : 0 as number
}
const  getAllInstructors = createAsyncThunk(
    "instructor/getAllInstructors",
    async ({index , size}: {index: number, size: number}, {rejectWithValue, dispatch})=>{
      
        
        try{
            // API call to fetch instructors
            if (getToken() == null ) 
              
                return rejectWithValue("logged first");
                 
            const response = await  axios.get(API_BASE+`/admin/instructor?pageIndex=${index}&pageSize=${size}` , {
                headers : {
                    Authorization : `Bearer ${getToken()}`
                }
            }
            );
            dispatch(setTotal(response.data.total))
            return response.data.result;
        }catch(error:any){
            return rejectWithValue(error.message);
        }
    }
)
const getInstructorById = createAsyncThunk(
    "instructor/getInstructorById",
    async (id : string , {rejectWithValue, dispatch})=>{
    try{
        // API call to fetch instructor by ID
        if (getToken() == null ) 
          
            return rejectWithValue("logged first");
             
        const response = await  axios.get(API_BASE+`/admin/instructor/${id}` , {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        }
        );
        console.log("data" ,response.data)
        return response.data;
    }
    catch(error:any){
        return rejectWithValue(error.message);
    }

     })
  const getPlanning =  createAsyncThunk(
    "instructor/getPlanning",
    async (id : string , {rejectWithValue, dispatch})=>{
    try{
        // API call to fetch instructor's planning by ID
        if (getToken() == null )
          
            return rejectWithValue("logged first");
             
        const response = await  axios.get(API_BASE+`/admin/planning/instructor/${id}` , {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        }
        );
       
        return response.data;
    }
    catch(error:any){
        return rejectWithValue(error.message);
    }

     }
  )



const instructor = createSlice({
    name : "instructor",
    initialState : initialState ,
    reducers : {
        setLoading(state, action){
            state.loading = action.payload;
        },
        setError(state, action){
            state.error = action.payload ?? null;
            state.loading = false;
        },
        setSizePage(state, action){
            state.pageSize = action.payload;
        } , 
        setIndexPage(state, action){
            state.indexPage = action.payload;
        },
        setTotal(state , action){
            state.total = action.payload;
        }
       
    }
    , extraReducers(builder) {
        builder.addCase(getAllInstructors.pending, (state) => { 
            state.loading = true;
            state.error = null;
         })
        .addCase(getAllInstructors.fulfilled, (state, action) => {
            state.loading = false;
            console.log("Instructors fetched:", action.payload);
            state.instructors = action.payload;
        })
        .addCase(getAllInstructors.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
    }).addCase(getInstructorById.pending, (state) => { 
            state.loading = true;
            state.error = null;
         })
        .addCase(getInstructorById.fulfilled, (state, action) => {
            state.loading = false;
            state.instructor = action.payload;
            // Here you might want to update a specific instructor in the state
        })
        .addCase(getInstructorById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
    }).addCase(getPlanning.pending, (state) => { 
            state.loading = true;
            state.error = null;
         })
        .addCase(getPlanning.fulfilled, (state, action) => {
            state.loading = false;
            state.planning = action.payload;
        })
        .addCase(getPlanning.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
    });
}
  
})
export const {  setLoading, setError  , setIndexPage, setSizePage, setTotal} = instructor.actions;
export { getAllInstructors , getInstructorById , getPlanning };
export default instructor.reducer;
const getToken = () => {
      const user =    sessionStorage.getItem('user');
      if (!user) return null;
        const parsedUser = JSON.parse(user);
        return parsedUser.token;
    }


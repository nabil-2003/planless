import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";
import { get } from "http";
import { getAllInstructors, getInstructorById } from "./instructorSlice";
const API_BASE = (
  (process.env.NEXT_PUBLIC_API_URL as string) 
).replace(/\/$/, '');


const initialState = {
    students : [] as Array<any>,
    student : null as any,
    loading : false,
    planning : null as any,
    error : null as string | null,
    pageSize: 10,
    indexPage: 0,
    total: 0,
}
const  getAllStudents = createAsyncThunk(
    "student/getAllStudents",
    async ({index , size}:{index: number, size: number}, {rejectWithValue, dispatch})=>{
      
        
        try{
            // API call to fetch instructors
            if (getToken() == null ) 
                return rejectWithValue("logged first");
                 console.log(`Fetching students with pageIndex=${index} and pageSize=${size}`)
            const response = await  axios.get(API_BASE+`/admin/student?pageIndex=${index}&pageSize=${size}` , {
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
const getStudentById = createAsyncThunk(
    "student/getStudentById",
    async (id : string , {rejectWithValue, dispatch})=>{
    try{
        // API call to fetch instructor by ID
        if (getToken() == null ) 
          
            return rejectWithValue("logged first");
             
        const response = await  axios.get(API_BASE+`/admin/student/${id}` , {
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

     })
     const getPlanningStudent =  createAsyncThunk(
        "student/getPlanningStudent",
        async (id : string, {rejectWithValue, dispatch})=>{

        try{
            // API call to fetch instructor by ID
             if (getToken() == null ) return rejectWithValue("logged first");
             
            const response = await  axios.get(API_BASE+`/admin/planning/student/${id}` , {
                headers : {
                    Authorization : `Bearer ${getToken()}`
                }
            }
            )
            console.log(response.data)
            return response.data;
        }catch(error:any){ 

            return rejectWithValue(error.message);
        }
            })
                 

const student = createSlice({
    name : "student",
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
        builder.addCase(getAllStudents.pending, (state) => { 
            state.loading = true;
            state.error = null;
         })
        .addCase(getAllStudents.fulfilled, (state, action) => {
            state.loading = false;
            console.log("here bro ", action.payload)
            state.students = action.payload;
        })
        .addCase(getAllStudents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
    }).addCase(getStudentById.pending, (state) => { 
            state.loading = true;
            state.error = null;
         })
        .addCase(getStudentById.fulfilled, (state, action) => {
            state.loading = false;
            state.student = action.payload;
            // Here you might want to update a specific student in the state
        })
        .addCase(getStudentById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
    }).addCase(getPlanningStudent.pending, (state) => { 
            state.loading = true;
            state.error = null;
         })
        .addCase(getPlanningStudent.fulfilled, (state, action) => {
            state.loading = false;
             
            state.planning = action.payload;      
            // Here you might want to update a specific student in the state
        }
    ).addCase(getPlanningStudent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
    });
}
  
})
export const {  setLoading, setError ,setIndexPage, setSizePage, setTotal } = student.actions;
export { getAllStudents , getStudentById , getPlanningStudent };
export default student.reducer;


function getToken () {
      const user =    sessionStorage.getItem('user');
      if (!user) return null;
        const parsedUser = JSON.parse(user);
        return parsedUser.token;
    }

  
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = (
  (process.env.NEXT_PUBLIC_API_URL as string) 
).replace(/\/$/, '');


const initialState = {
    lessons : [] as Array<any>,
    lesson : null as any,
    loading : false,
    error : null as string | null,
    indexPage : 0 as number ,
    pageSize : 10 as number ,
    total : 0 as number
}
const  getAllLessons= createAsyncThunk(
    "lessons/getAllLessons",
    async ( {pageN , pageSize}  :{pageN: number , pageSize: number }, {rejectWithValue , dispatch})=>{
      

        try{
            // API call to fetch instructors
            if (getToken() == null ) 
              
                return rejectWithValue("logged first");
                 
            const response = await  axios.get(API_BASE+`/admin/planning?pageIndex=${pageN}&pageSize=${pageSize}` , {
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
const getLessonById = createAsyncThunk(
    "lessons/getLessonById",
    async (id : string , {rejectWithValue})=>{
    try{
        // API call to fetch instructor by ID
        if (getToken() == null ) 
          
            return rejectWithValue("logged first");
             
        const response = await  axios.get(API_BASE+`/admin/planning/${id}` , {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        }
        );
        console.log(response.data)
        return response.data;
    }
    catch(error:any){
        return rejectWithValue(error.message);
    }

     })
  



const lessons = createSlice({
    name : "lessons",
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
        builder.addCase(getAllLessons.pending, (state) => { 
            state.loading = true;
            state.error = null;
         })
        .addCase(getAllLessons.fulfilled, (state, action) => {
            state.loading = false;
           
            state.lessons = action.payload;
        })
        .addCase(getAllLessons.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
    }).addCase(getLessonById.pending, (state) => { 
            state.loading = true;
            state.error = null;
         })
        .addCase(getLessonById.fulfilled, (state, action) => {
            state.loading = false;
            state.lesson = action.payload;
        })
        .addCase(getLessonById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
    });
}
  
})
export const {  setLoading, setError , setTotal , setIndexPage , setSizePage } = lessons.actions;
export { getAllLessons , getLessonById  };
export default lessons.reducer;


const getToken = () => {
      const user =    sessionStorage.getItem('user');
      if (!user) return null;
        const parsedUser = JSON.parse(user);
        return parsedUser.token;
    }
  export interface ParsedLesson {
    id : string;
  instructor: string | null;
  student: string | null;
  start_time: string;
  end_time: string;
  lesson_duration: string;
  invoice_amount: string | null;
  lesson_status: string | null;
  payment_status: string | null;
  cancellation_time: string | null;
  cancellation_reason: string | null;
  order : object | null;
  lesson_cards: any[];
}
  export function getparsedLesson(lesson: any): ParsedLesson|null { 
  if (lesson === null) return  null ;
   console.log(lesson.instructor.name)
   const tmp: ParsedLesson|null = {
    id : lesson.id,
    order : lesson.order ?? null,
    instructor: lesson.instructor.name,
    student: lesson.student.name,
    start_time: lesson.startDate,
    end_time: lesson.endDate   ,
    lesson_duration: parsDuration(Date.parse(lesson.endDate) - Date.parse(lesson.startDate)),
    invoice_amount: lesson.payment.amount,
    lesson_status: lesson.status,
    payment_status: lesson.payment.status,           
    cancellation_time: "next",
    cancellation_reason: "next",
    lesson_cards: lesson.order.data,
   } 



   console.log("tmp",tmp)
    return tmp
   }
   const parsDuration = (ms : number ): string => {
    const totalSeconds = Math.floor(ms / 1000);
    let hours :string = Math.floor(totalSeconds / 3600).toString();
      hours  = parseInt(hours) < 10 ? "0"+ hours : hours;
    let minutes :string = Math.floor((totalSeconds % 3600) / 60).toString();
      minutes  = parseInt(minutes) < 10 ? "0"+ minutes : minutes;
    const seconds = totalSeconds % 60;
    let secondsStr :string = seconds.toString();
      secondsStr = parseInt(secondsStr) < 10 ? "0"+ secondsStr : secondsStr;
    
    return `${hours}:${minutes}:${secondsStr}`;
   }
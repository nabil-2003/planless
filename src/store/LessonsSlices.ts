import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE, getToken } from "@/utils";
import type { LessonState, LessonFilters } from "@/types";

const initialState: LessonState = {
    lessons : [] as Array<any>,
    lesson : null as any,
    loading : false,
    error : null as string | null,
    indexPage : 0 as number ,
    pageSize : 10 as number ,
    total : 0 as number , 
    search : "" as string ,
    status : "pending" as string ,
    startDate : "2025-11-01" as string ,
    endDate : "2026-11-01" as string ,
    loadingForModal : false
}
const  getAllLessons= createAsyncThunk(
    "lessons/getAllLessons",
    async ( {pageN , pageSize , startDate = "2025-11-01", endDate = "2026-11-01", status = "pending", search = ""}  :{pageN: number , pageSize: number , startDate: string , endDate: string , status: string , search: string }, {rejectWithValue , dispatch})=>{
      
         console.log("status", status)
        try{
            // API call to fetch instructors
            if (getToken() == null ) 
             
                return rejectWithValue("logged first");
                 
            const response = await  axios.get(API_BASE+`/admin/planning?pageIndex=${pageN}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}${status != "all" ? "&status="+status : ""}&search=${search}` , {
                headers : {
                    Authorization : `Bearer ${getToken()}`
                }
            }
            );
            console.log("reeee",response.data)
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
  
 const UpdateLessonStatus = createAsyncThunk(
    "lessons/UpdateLessonStatus",
    async ( {id , status} : {id : string , status : string} , {rejectWithValue , dispatch})=>{
    try{
        // API call to fetch lessons by ID
        if (getToken() == null )
          
            return rejectWithValue("logged first");
            
        const promise = new Promise((resolve, reject) => {setTimeout(() => resolve({status, id}), 1000)});
        
        
       return await promise;
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
        , 
        setSearch(state , action){
            state.search = action.payload;
        }
        , setStartDate(state , action){ 
            state.startDate = action.payload;
        }
        , setEndDate(state , action){ 
            state.endDate = action.payload;
        }
        , setStatus(state , action){ 
            state.status = action.payload;
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
            state.loadingForModal = true;
            state.error = null;
         })
        .addCase(getLessonById.fulfilled, (state, action) => {
            state.loadingForModal = false;
            state.lesson = action.payload;
        })
        .addCase(getLessonById.rejected, (state, action) => {
            state.loadingForModal = false;
            state.error = action.payload as string;
    }).addCase(UpdateLessonStatus.pending, (state) => { 
            state.error = null;
         })
        .addCase(UpdateLessonStatus.fulfilled, (state, action) => {
             state.loading = false;
            console.log("Lesson status updated:", action.payload);
        })
        .addCase(UpdateLessonStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
    });
}
  
})
export const {  setLoading, setError , setTotal , setIndexPage , setSizePage ,
     setEndDate , setSearch , setStartDate , setStatus } = lessons.actions;
export { getAllLessons , getLessonById  , UpdateLessonStatus };
export default lessons.reducer;

export interface ParsedLesson {
    id : string;
  instructor: string | null;
  student: string | null;
  start_time: string;
  end_time: string;
  lesson_duration: string;
  date : string ;
  invoice_amount: string | null;
  lesson_status: string | null;
  payment_status: string | null;
  cancellation_time: string | null;
  order : object | null;
  lesson_cards: any[];
  adress?: string | null;
  Studentphone?: string | null;
}
  export function getparsedLesson(lesson: any): ParsedLesson|null { 
   
  if (lesson === null) return  null ;

    console.log("lesson to parse" , lesson)
   const tmp: ParsedLesson|null = {
    id : lesson.id,
    order : lesson.order ?? null,
    instructor: lesson.instructor?.name,
    student: lesson.student?.name,
    start_time: lesson.startDate?.split("T")[1].split(".")[0],
    end_time: lesson.endDate?.split("T")[1].split(".")[0],
    date : lesson.startDate?.split("T")[0] ,
    lesson_duration: parsDuration(Date.parse(lesson.endDate) - Date.parse(lesson.startDate)),
    invoice_amount: lesson?.payment?.amount,
    lesson_status: lesson?.status,
    payment_status: lesson?.payment?.status,           
    cancellation_time: "---",
    lesson_cards: lesson.order?.data?.items ?? [],
    adress: lesson?.student?.city+", "+lesson?.student?.street+", "+lesson?.student?.zipCode+", "+lesson?.student?.houseNumber || "---",
    Studentphone : lesson?.student?.phone || "---"
   } 
   
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
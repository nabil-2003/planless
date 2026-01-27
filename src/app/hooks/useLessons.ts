import axios from "axios";
import { useRouter } from 'next/navigation'
import { useMemo } from 'react';
import { useAppDispatch , useAppSelector } from "@/store/hooks";
import { getAllInstructors, getInstructorById } from "@/store/instructorSlice";
import { removeuserFromSession } from '@/utils';
import { getAllLessons, getLessonById, getparsedLesson, setEndDate, setIndexPage, setSearch, setSizePage, setStartDate, setStatus, UpdateLessonStatus } from "@/store/LessonsSlices";
  
const useLessons = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.lessons);
const fetchLessonById = async (id : string) => {
    try {
      // Dispatch the thunk and unwrap the result so errors are thrown here
      const result = await dispatch(getLessonById(id)).unwrap();
      console.debug('useLessons: getLessonById result:', result);
      return getparsedLesson(result);
    }
    catch(error: any) {
      console.error('An error occurred while fetching lesson by ID:', error);
    }
  }
  const date= new Date()
  date.setFullYear(date.getFullYear()+1); 

  // Hook logic for instructor role
  const fetchAllLessons = async (pageN  : number = 0, pageSize: number = 10 , search: string = '' , startDate: number = 0, endDate: number = new Date("01-01-2100").getTime(), status: string = 'pending') => {
    try {
      // Helpful debug: check session storage for user/token
    
  
      const s = new Date(startDate).toISOString().split('T')[0]
      const e = new Date(endDate).toISOString().split('T')[0]
    console.log("fetchAllLessons called with:", { pageN, pageSize, search, s, e, status });
      // Dispatch the thunk and unwrap the result so errors are thrown here
   await dispatch(getAllLessons({ pageN, pageSize ,search, startDate : s , endDate : e , status  })).unwrap();
 
    } catch (error: any) {
      console.error('An error occurred while fetching lessons:', error);
      // If unauthorized, clear session and redirect to login
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          removeuserFromSession();
          const router = useRouter()
          router.replace('/auth/login')
        } catch (e) {
          // ignore routing errors in non-client contexts
        }
      }
      // propagate error to caller
      throw error;
    }
  };
  const setIndex = (index : number )=>{
        dispatch(setIndexPage(index))
  }
  const setSize = (size : number )=>{
        dispatch(setSizePage(size))
  }
  const setSearchLessons = (search : string )=>{
    
        dispatch((setSearch(search)))
  }
  const setEndDateLessons = (endDate : string )=>{
    
        dispatch((setEndDate(endDate)))
  }
  const setStatusLessons = (status : string )=>{
    
        dispatch((setStatus(status)))
  }
  const setStartDateLessons = (startDate : string )=>{
    console.log("startDate" , startDate)
     dispatch((setStartDate(startDate)))
  }
  const confirmStatus = async (id : string)=>{
   await dispatch(UpdateLessonStatus({id : id , status : "confirmed"}))
  }

  // 🔧 FIX: Memoize parsed lesson to prevent new object creation on every render
  const parsedLesson = useMemo(() => {
    return getparsedLesson(selector.lesson as any);
  }, [selector.lesson]);

  return {
    fetchAllLessons,
    index : selector.indexPage,
    size : selector.pageSize,
    lessons: selector.lessons ,
    loading: selector.loading as boolean,
    error: selector.error as string | null, 
    lesson : parsedLesson,  // ✅ Now returns same object reference until selector.lesson actually changes
    total: selector.total ,
    loadingforModal : selector.loadingForModal as boolean ,
    fetchLessonById , 
    setIndex ,
    setSize , 
    setStartDateLessons ,
    setEndDateLessons ,
    setSearchLessons ,
    setStatusLessons ,
    endDateLessons : selector.endDate,
    startDateLessons : selector.startDate , 
    confirmStatus
  };
};

export default useLessons;   



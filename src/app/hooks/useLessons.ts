import axios from "axios";
import { useRouter } from 'next/navigation'
import { useAppDispatch , useAppSelector } from "@/store/hooks";
import { getAllInstructors, getInstructorById } from "@/store/instructorSlice";
import { removeuserFromSession } from '@/store/userSlice'
import { getAllLessons, getLessonById, getparsedLesson } from "@/store/LessonsSlices";
  
const useLessons = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.lessons);
const fetchLessonById = async (id : string) => {
    try {
      // Dispatch the thunk and unwrap the result so errors are thrown here
      const result = await dispatch(getLessonById(id)).unwrap();
      console.debug('useLessons: getLessonById result:', result);
      return result;
    }
    catch(error: any) {
      console.error('An error occurred while fetching lesson by ID:', error);
    }
  }
  // Hook logic for instructor role
  const fetchAllLessons = async () => {
    try {
      // Helpful debug: check session storage for user/token
    

      // Dispatch the thunk and unwrap the result so errors are thrown here
      const result = await dispatch(getAllLessons()).unwrap();
      console.debug('useLessons: getAllLessons result:', result);
      return result;
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

  

  return {
    fetchAllLessons,
    lessons: selector.lessons ,
    loading: selector.loading as boolean,
    error: selector.error as string | null, 
    lesson : getparsedLesson(selector.lesson as any),
    fetchLessonById , 
  };
};

export default useLessons;   



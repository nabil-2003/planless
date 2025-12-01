import axios from "axios";
import { useRouter } from 'next/navigation'
import { useAppDispatch , useAppSelector } from "@/store/hooks";
import { getAllInstructors, getInstructorById, getPlanning } from "@/store/instructorSlice";
import { removeuserFromSession } from '@/store/userSlice'
  
const useInstructor = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.instructor);
const fetchInstructorById = async (id : string) => {
    try {
      // Dispatch the thunk and unwrap the result so errors are thrown here
      const result = await dispatch(getInstructorById(id)).unwrap();
      console.debug('useInstructor: getInstructorById result:', result);
      return result;
    }
    catch(error: any) {
      console.error('An error occurred while fetching instructor by ID:', error);
    }
  }
  // Hook logic for instructor role
  const fetchAllInstructors = async () => {
    try {
      // Helpful debug: check session storage for user/token
    

      // Dispatch the thunk and unwrap the result so errors are thrown here
      const result = await dispatch(getAllInstructors()).unwrap();
      console.debug('useInstructor: getAllInstructors result:', result);
      return result;
    } catch (error: any) {
      console.error('An error occurred while fetching instructors:', error);
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
  const fetchAllPlanningForInstructor = async (id : string) => {
    try {
      // Dispatch the thunk and unwrap the result so errors are thrown here
      const result = await dispatch(getPlanning(id)).unwrap();
      console.debug('useInstructor: getPlanningForInstructor result:', result);
      
    } catch (error: any) {
      console.error('An error occurred while fetching planning for instructor:', error);
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
    fetchAllInstructors,
    instructors: selector.instructors,
    loading: selector.loading as boolean,
    error: selector.error as string | null, 
    instructor : selector.instructor as any,
    fetchInstructorById , 
     planning : selector.planning as any , 
     fetchAllPlanningForInstructor
  };
};

export default useInstructor;   



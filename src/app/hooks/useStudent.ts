import axios from "axios";
import { useRouter } from 'next/navigation'
import { useAppDispatch , useAppSelector } from "@/store/hooks";
import { getAllInstructors, getInstructorById } from "@/store/instructorSlice";
import { removeuserFromSession } from '@/utils';
import { getAllStudents, getPlanningStudent, getStudentById, setIndexPage, setSearch, setSizePage,  } from "@/store/studentSlice";
  
const useStudent = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.student);
const fetchStudentById = async (id : string) => {
    try {
      // Dispatch the thunk and unwrap the result so errors are thrown here
      const result = await dispatch(getStudentById(id)).unwrap();
      console.debug('useStudent:  result:', result);
      return result;
    }
    catch(error: any) {
      console.error('An error occurred while fetching student by ID:', error);
    }
  }
  // Hook logic for instructor role
  const fetchAllStudents = async () => {
    try {
      // Helpful debug: check session storage for user/token
     console.log("fetchAllStudents called with:", { index: selector.indexPage, pageSize: selector.pageSize , search: selector.search});

      // Dispatch the thunk and unwrap the result so errors are thrown here
      const result = await dispatch(getAllStudents({index: selector.indexPage, size: selector.pageSize , search: selector.search})).unwrap();
      return result;
    } catch (error: any) {
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
  const fetchPlanningStudentById = async (id : string) => {
    try {
      // Dispatch the thunk and unwrap the result so errors are thrown here
      const result = await dispatch(getPlanningStudent(id)).unwrap();
    } catch (error: any) {
    }
  } 
  const setSize = (size : number )=>{
    dispatch(setSizePage(size));
  }
  const setIndex = (index : number )=>{
    dispatch(setIndexPage(index));
  }
  const SearchStudent = (search : string )=>{
    dispatch(setSearch(search));
  }
  
  
  return {
    fetchAllStudents,
    students: selector.students,
    loading: selector.loading as boolean,
    error: selector.error as string | null, 
    student : selector.student as any,
    planning : selector.planning as any,
    fetchStudentById , 
    fetchPlanningStudentById 
    , 
    SearchStudent,
    setSize
    , 
    setIndex ,
    pageSize: selector.pageSize,
    indexPage: selector.indexPage,
    total: selector.total,
    search : selector.search
  };
};

export default useStudent;   



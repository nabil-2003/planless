import { useState, useEffect, useCallback } from 'react';
import { studentService } from '../services/studentService';
import type {
  Student,
  CreateStudentDTO,
  UpdateStudentDTO,
  StudentFilters,
  StudentStats,
} from '../types/student.types';
import type { ApiError } from '@/shared/types';

/**
 * Custom hook for fetching all students
 */
export function useStudents(filters?: StudentFilters) {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const students = await studentService.getAll(filters);
      setData(students);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    students: data,
    loading,
    error,
    refetch: fetchStudents,
  };
}

/**
 * Custom hook for fetching a single student
 */
export function useStudent(id: string | null) {
  const [data, setData] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      return;
    }

    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError(null);
        const student = await studentService.getById(id);
        setData(student);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  return {
    student: data,
    loading,
    error,
  };
}

/**
 * Custom hook for student mutations (create, update, delete)
 */
export function useStudentMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const createStudent = async (student: CreateStudentDTO): Promise<Student | null> => {
    try {
      setLoading(true);
      setError(null);
      const newStudent = await studentService.create(student);
      return newStudent;
    } catch (err) {
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (
    id: string,
    student: UpdateStudentDTO
  ): Promise<Student | null> => {
    try {
      setLoading(true);
      setError(null);
      const updatedStudent = await studentService.update(id, student);
      return updatedStudent;
    } catch (err) {
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await studentService.delete(id);
      return true;
    } catch (err) {
      setError(err as ApiError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createStudent,
    updateStudent,
    deleteStudent,
    loading,
    error,
  };
}

/**
 * Custom hook for student statistics
 */
export function useStudentStats() {
  const [data, setData] = useState<StudentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const stats = await studentService.getStats();
        setData(stats);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stats: data,
    loading,
    error,
  };
}

/**
 * Custom hook for students by instructor
 */
export function useStudentsByInstructor(instructorId: string | null) {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    if (!instructorId) {
      setData([]);
      return;
    }

    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        const students = await studentService.getByInstructor(instructorId);
        setData(students);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [instructorId]);

  return {
    students: data,
    loading,
    error,
  };
}

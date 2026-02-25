import { apiClient } from '@/shared/services/api/client';
import type {
  Student,
  CreateStudentDTO,
  UpdateStudentDTO,
  StudentFilters,
  StudentStats,
} from '../types/student.types';
import type { PaginatedResponse } from '@/shared/types';

/**
 * Student Service
 * Handles all student-related API calls
 */

class StudentService {
  private readonly basePath = '/students';

  /**
   * Get all students with optional filters
   */
  async getAll(filters?: StudentFilters): Promise<Student[]> {
    const { data } = await apiClient.get<Student[]>(this.basePath, {
      params: filters,
    });
    return data;
  }

  /**
   * Get paginated students
   */
  async getPaginated(
    page: number = 1,
    pageSize: number = 10,
    filters?: StudentFilters
  ): Promise<PaginatedResponse<Student>> {
    const { data } = await apiClient.get<PaginatedResponse<Student>>(
      `${this.basePath}/paginated`,
      {
        params: { page, pageSize, ...filters },
      }
    );
    return data;
  }

  /**
   * Get student by ID
   */
  async getById(id: string): Promise<Student> {
    const { data } = await apiClient.get<Student>(`${this.basePath}/${id}`);
    return data;
  }

  /**
   * Create new student
   */
  async create(student: CreateStudentDTO): Promise<Student> {
    const { data } = await apiClient.post<Student>(this.basePath, student);
    return data;
  }

  /**
   * Update existing student
   */
  async update(id: string, student: UpdateStudentDTO): Promise<Student> {
    const { data } = await apiClient.patch<Student>(
      `${this.basePath}/${id}`,
      student
    );
    return data;
  }

  /**
   * Delete student
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }

  /**
   * Get student statistics
   */
  async getStats(): Promise<StudentStats> {
    const { data } = await apiClient.get<StudentStats>(
      `${this.basePath}/stats`
    );
    return data;
  }

  /**
   * Get students by instructor
   */
  async getByInstructor(instructorId: string): Promise<Student[]> {
    const { data } = await apiClient.get<Student[]>(
      `${this.basePath}/by-instructor/${instructorId}`
    );
    return data;
  }

  /**
   * Upload student document
   */
  async uploadDocument(
    studentId: string,
    file: File,
    documentType: string
  ): Promise<Student> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    const { data } = await apiClient.post<Student>(
      `${this.basePath}/${studentId}/documents`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  }
}

// Export singleton instance
export const studentService = new StudentService();

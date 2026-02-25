import { apiClient } from '@/shared/services/api/client';
import type {
  Instructor,
  CreateInstructorDTO,
  UpdateInstructorDTO,
  InstructorFilters,
  InstructorStats,
} from '../types/instructor.types';

/**
 * Instructor Service
 * Handles all instructor-related API calls
 */

class InstructorService {
  private readonly basePath = '/instructors';

  async getAll(filters?: InstructorFilters): Promise<Instructor[]> {
    const { data } = await apiClient.get<Instructor[]>(this.basePath, {
      params: filters,
    });
    return data;
  }

  async getById(id: string): Promise<Instructor> {
    const { data } = await apiClient.get<Instructor>(`${this.basePath}/${id}`);
    return data;
  }

  async create(instructor: CreateInstructorDTO): Promise<Instructor> {
    const { data } = await apiClient.post<Instructor>(this.basePath, instructor);
    return data;
  }

  async update(id: string, instructor: UpdateInstructorDTO): Promise<Instructor> {
    const { data } = await apiClient.patch<Instructor>(
      `${this.basePath}/${id}`,
      instructor
    );
    return data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }

  async getStats(): Promise<InstructorStats> {
    const { data } = await apiClient.get<InstructorStats>(
      `${this.basePath}/stats`
    );
    return data;
  }

  async getAvailability(id: string, date: string): Promise<any> {
    const { data } = await apiClient.get(
      `${this.basePath}/${id}/availability`,
      {
        params: { date },
      }
    );
    return data;
  }
}

export const instructorService = new InstructorService();

import { apiClient } from '@/shared/services/api/client';
import type {
  Lesson,
  CreateLessonDTO,
  UpdateLessonDTO,
  LessonFilters,
  LessonStats,
  CalendarLesson,
} from '../types/lesson.types';

/**
 * Lesson Service
 * Handles all lesson-related API calls
 */

class LessonService {
  private readonly basePath = '/lessons';

  async getAll(filters?: LessonFilters): Promise<Lesson[]> {
    const { data } = await apiClient.get<Lesson[]>(this.basePath, {
      params: filters,
    });
    return data;
  }

  async getById(id: string): Promise<Lesson> {
    const { data } = await apiClient.get<Lesson>(`${this.basePath}/${id}`);
    return data;
  }

  async create(lesson: CreateLessonDTO): Promise<Lesson> {
    const { data } = await apiClient.post<Lesson>(this.basePath, lesson);
    return data;
  }

  async update(id: string, lesson: UpdateLessonDTO): Promise<Lesson> {
    const { data } = await apiClient.patch<Lesson>(
      `${this.basePath}/${id}`,
      lesson
    );
    return data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }

  async cancel(id: string, reason: string): Promise<Lesson> {
    const { data } = await apiClient.post<Lesson>(
      `${this.basePath}/${id}/cancel`,
      { reason }
    );
    return data;
  }

  async getStats(filters?: Partial<LessonFilters>): Promise<LessonStats> {
    const { data } = await apiClient.get<LessonStats>(
      `${this.basePath}/stats`,
      { params: filters }
    );
    return data;
  }

  async getCalendarLessons(startDate: string, endDate: string): Promise<CalendarLesson[]> {
    const { data } = await apiClient.get<CalendarLesson[]>(
      `${this.basePath}/calendar`,
      {
        params: { startDate, endDate },
      }
    );
    return data;
  }

  async getByStudent(studentId: string): Promise<Lesson[]> {
    const { data } = await apiClient.get<Lesson[]>(
      `${this.basePath}/by-student/${studentId}`
    );
    return data;
  }

  async getByInstructor(instructorId: string): Promise<Lesson[]> {
    const { data } = await apiClient.get<Lesson[]>(
      `${this.basePath}/by-instructor/${instructorId}`
    );
    return data;
  }
}

export const lessonService = new LessonService();

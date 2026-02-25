import type { BaseEntity } from '@/shared/types';
import { LessonStatus, PaymentStatus } from '@/shared/constants/config';

/**
 * Lesson Domain Types
 */

export interface Lesson extends BaseEntity {
  // Identification
  lessonNumber: number;
  
  // Participants
  instructorId: string;
  instructorName: string;
  studentId: string;
  studentName: string;
  
  // Scheduling
  startTime: string; // ISO string
  endTime: string; // ISO string
  duration: string; // HH:mm:ss format
  
  // Location
  pickupAddress?: string;
  dropoffAddress?: string;
  
  // Status
  lessonStatus: LessonStatus;
  paymentStatus: PaymentStatus;
  
  // Financial
  amount: number;
  currency: string;
  
  // Cancellation
  cancellationTime?: string;
  cancellationReason?: string;
  
  // Notes
  notes?: string;
  instructorNotes?: string;
}

export interface CreateLessonDTO {
  instructorId: string;
  studentId: string;
  startTime: string;
  endTime: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  amount: number;
  notes?: string;
}

export interface UpdateLessonDTO extends Partial<CreateLessonDTO> {
  lessonStatus?: LessonStatus;
  paymentStatus?: PaymentStatus;
  cancellationReason?: string;
  instructorNotes?: string;
}

export interface LessonFilters {
  instructorId?: string;
  studentId?: string;
  lessonStatus?: LessonStatus;
  paymentStatus?: PaymentStatus;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface LessonStats {
  totalLessons: number;
  completedLessons: number;
  cancelledLessons: number;
  totalRevenue: number;
  totalHours: number;
  upcomingLessons: number;
}

// Calendar event type
export interface CalendarLesson {
  id: string;
  title: string;
  start: Date;
  end: Date;
  instructor: string;
  student: string;
  status: LessonStatus;
  backgroundColor?: string;
  borderColor?: string;
}

import type { BaseEntity } from '@/shared/types';

/**
 * Instructor Domain Types
 */

export enum InstructorStatus {
  ACTIVE = 'Actief',
  INACTIVE = 'Inactief',
  ON_LEAVE = 'Met verlof',
}

export interface Instructor extends BaseEntity {
  // Personal Information
  name: string;
  email: string;
  phone: string;
  alternativePhone?: string;
  dateOfBirth?: string;
  
  // Address
  address?: string;
  
  // Professional Information
  status: InstructorStatus;
  licenseNumber?: string;
  specializations: string[]; // e.g., ['B', 'A', 'C']
  
  // Employment
  employmentType: 'Fulltime' | 'Parttime' | 'Zzp';
  startDate: string;
  hourlyRate?: number;
  
  // Availability
  availability?: InstructorAvailability[];
  
  // Statistics
  totalStudents?: number;
  totalLessons?: number;
  totalHours?: number;
  rating?: number;
  
  // Notes
  notes?: string;
}

export interface InstructorAvailability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

export interface CreateInstructorDTO {
  name: string;
  email: string;
  phone: string;
  alternativePhone?: string;
  address?: string;
  specializations: string[];
  employmentType: 'Fulltime' | 'Parttime' | 'Zzp';
  startDate: string;
  hourlyRate?: number;
  notes?: string;
}

export interface UpdateInstructorDTO extends Partial<CreateInstructorDTO> {
  status?: InstructorStatus;
  availability?: InstructorAvailability[];
}

export interface InstructorFilters {
  status?: InstructorStatus;
  specialization?: string;
  employmentType?: string;
  search?: string;
}

export interface InstructorStats {
  totalInstructors: number;
  activeInstructors: number;
  totalHoursThisMonth: number;
  totalLessonsThisMonth: number;
  averageRating: number;
}

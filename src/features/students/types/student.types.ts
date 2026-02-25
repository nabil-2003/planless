import type {
  BaseEntity,
  Address,
  ContactInfo,
  Document,
} from '@/shared/types';
import {
  StudentStatus,
  LicenseCategory,
  ExamStatus,
} from '@/shared/constants/config';

/**
 * Student Domain Types
 */

export interface Student extends BaseEntity {
  // Personal Information
  name: string;
  bsnNumber: string;
  email: string;
  phone: string;
  alternativePhone?: string;
  dateOfBirth: string;
  
  // Address
  address: string; // Full address string
  addressDetails?: Address; // Parsed address
  
  // Status
  status: StudentStatus;
  
  // License Information
  licenseCategory: LicenseCategory;
  theoryExam: ExamStatus;
  practicalExam: ExamStatus;
  
  // Lesson Information
  numberOfLessons: number;
  lastLessonDate?: string;
  instructorId: string;
  instructorName?: string;
  
  // Documents
  documents?: Document[];
  
  // Notes
  notes?: string;
}

export interface CreateStudentDTO {
  name: string;
  bsnNumber: string;
  email: string;
  phone: string;
  alternativePhone?: string;
  dateOfBirth: string;
  address: string;
  licenseCategory: LicenseCategory;
  instructorId: string;
  notes?: string;
}

export interface UpdateStudentDTO extends Partial<CreateStudentDTO> {
  status?: StudentStatus;
  theoryExam?: ExamStatus;
  practicalExam?: ExamStatus;
}

export interface StudentFilters {
  status?: StudentStatus;
  instructorId?: string;
  licenseCategory?: LicenseCategory;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  graduatedStudents: number;
  totalLessons: number;
  averageLessonsPerStudent: number;
}

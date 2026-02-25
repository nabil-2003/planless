import type { BaseEntity } from '@/shared/types';
import { PaymentStatus } from '@/shared/constants/config';

/**
 * Finance Domain Types
 */

export enum InvoiceType {
  STUDENT_INVOICE = 'Student Factuur',
  INSTRUCTOR_PAYMENT = 'Instructeur Betaling',
}

export interface Invoice extends BaseEntity {
  // Identification
  invoiceNumber: string;
  type: InvoiceType;
  
  // Related entities
  studentId?: string;
  studentName?: string;
  instructorId?: string;
  instructorName?: string;
  lessonId?: string;
  
  // Dates
  invoiceDate: string;
  dueDate: string;
  paidDate?: string;
  
  // Financial
  amount: number;
  currency: string;
  vatPercentage?: number;
  vatAmount?: number;
  totalAmount: number;
  
  // Status
  paymentStatus: PaymentStatus;
  
  // Description
  description?: string;
  items?: InvoiceItem[];
  
  // Notes
  notes?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface CreateInvoiceDTO {
  type: InvoiceType;
  studentId?: string;
  instructorId?: string;
  lessonId?: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  description?: string;
  items?: InvoiceItem[];
  notes?: string;
}

export interface UpdateInvoiceDTO extends Partial<CreateInvoiceDTO> {
  paymentStatus?: PaymentStatus;
  paidDate?: string;
}

export interface InvoiceFilters {
  type?: InvoiceType;
  paymentStatus?: PaymentStatus;
  studentId?: string;
  instructorId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface FinancialStats {
  totalRevenue: number;
  totalPaid: number;
  totalUnpaid: number;
  totalOverdue: number;
  invoicesThisMonth: number;
  revenueThisMonth: number;
  payoutsDueThisMonth: number;
}

// Student financial summary
export interface StudentFinancialSummary {
  studentId: string;
  studentName: string;
  totalInvoiced: number;
  totalPaid: number;
  totalOutstanding: number;
  numberOfInvoices: number;
  lastPaymentDate?: string;
}

// Instructor financial summary
export interface InstructorFinancialSummary {
  instructorId: string;
  instructorName: string;
  totalHoursWorked: number;
  totalEarned: number;
  totalPaid: number;
  totalOutstanding: number;
  lastPaymentDate?: string;
}

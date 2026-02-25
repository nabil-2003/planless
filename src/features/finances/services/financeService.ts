import { apiClient } from '@/shared/services/api/client';
import type {
  Invoice,
  CreateInvoiceDTO,
  UpdateInvoiceDTO,
  InvoiceFilters,
  FinancialStats,
  StudentFinancialSummary,
  InstructorFinancialSummary,
} from '../types/finance.types';

/**
 * Finance Service
 * Handles all finance-related API calls
 */

class FinanceService {
  private readonly basePath = '/finances';

  async getAll(filters?: InvoiceFilters): Promise<Invoice[]> {
    const { data } = await apiClient.get<Invoice[]>(this.basePath, {
      params: filters,
    });
    return data;
  }

  async getById(id: string): Promise<Invoice> {
    const { data } = await apiClient.get<Invoice>(`${this.basePath}/${id}`);
    return data;
  }

  async create(invoice: CreateInvoiceDTO): Promise<Invoice> {
    const { data } = await apiClient.post<Invoice>(this.basePath, invoice);
    return data;
  }

  async update(id: string, invoice: UpdateInvoiceDTO): Promise<Invoice> {
    const { data } = await apiClient.patch<Invoice>(
      `${this.basePath}/${id}`,
      invoice
    );
    return data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }

  async markAsPaid(id: string): Promise<Invoice> {
    const { data } = await apiClient.post<Invoice>(
      `${this.basePath}/${id}/mark-paid`
    );
    return data;
  }

  async getStats(): Promise<FinancialStats> {
    const { data} = await apiClient.get<FinancialStats>(
      `${this.basePath}/stats`
    );
    return data;
  }

  async getStudentSummary(studentId: string): Promise<StudentFinancialSummary> {
    const { data } = await apiClient.get<StudentFinancialSummary>(
      `${this.basePath}/student/${studentId}/summary`
    );
    return data;
  }

  async getInstructorSummary(instructorId: string): Promise<InstructorFinancialSummary> {
    const { data } = await apiClient.get<InstructorFinancialSummary>(
      `${this.basePath}/instructor/${instructorId}/summary`
    );
    return data;
  }

  async generatePDF(id: string): Promise<Blob> {
    const { data } = await apiClient.get(`${this.basePath}/${id}/pdf`, {
      responseType: 'blob',
    });
    return data as Blob;
  }
}

export const financeService = new FinanceService();

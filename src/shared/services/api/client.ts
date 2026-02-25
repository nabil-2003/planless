import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV } from '@/shared/constants/env';
import { APP_CONFIG } from '@/shared/constants/config';
import type { ApiError } from '@/shared/types';

/**
 * API Client
 * Centralized axios instance with interceptors
 */

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: ENV.API_URL,
      timeout: APP_CONFIG.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Add auth token from sessionStorage
        const userStr = sessionStorage.getItem('user');
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            if (user.token) {
              config.headers.Authorization = `Bearer ${user.token}`;
            }
          } catch (error) {
            console.error('Failed to parse user from sessionStorage');
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError<ApiError>) => {
        return this.handleError(error);
      }
    );
  }

  private handleError(error: AxiosError<ApiError>): Promise<never> {
    const apiError: ApiError = {
      message: 'An unexpected error occurred',
      statusCode: error.response?.status,
    };

    if (error.response) {
      // Server responded with error
      apiError.message = error.response.data?.message || error.message;
      apiError.code = error.response.data?.code;

      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear session and redirect to login
          sessionStorage.clear();
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
          apiError.message = 'Session expired. Please login again.';
          break;

        case 403:
          apiError.message = 'You do not have permission to perform this action.';
          break;

        case 404:
          apiError.message = error.response.data?.message || 'Resource not found';
          break;

        case 422:
          apiError.message = 'Validation error. Please check your input.';
          break;

        case 500:
          apiError.message = 'Server error. Please try again later.';
          break;
      }
    } else if (error.request) {
      // Request made but no response
      apiError.message = 'Network error. Please check your connection.';
    }

    console.error('API Error:', apiError);
    return Promise.reject(apiError);
  }

  // HTTP Methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

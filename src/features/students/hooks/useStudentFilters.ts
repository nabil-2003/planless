import { useState, useCallback, useMemo } from 'react';
import type { StudentFilters } from '../types/student.types';
import { StudentStatus, LicenseCategory } from '@/shared/constants/config';

/**
 * Custom hook for managing student filters
 */
export function useStudentFilters() {
  const [filters, setFilters] = useState<StudentFilters>({});

  const updateFilter = useCallback((key: keyof StudentFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const setStatus = useCallback(
    (status: StudentStatus | undefined) => {
      updateFilter('status', status);
    },
    [updateFilter]
  );

  const setInstructor = useCallback(
    (instructorId: string | undefined) => {
      updateFilter('instructorId', instructorId);
    },
    [updateFilter]
  );

  const setLicenseCategory = useCallback(
    (category: LicenseCategory | undefined) => {
      updateFilter('licenseCategory', category);
    },
    [updateFilter]
  );

  const setSearch = useCallback(
    (search: string | undefined) => {
      updateFilter('search', search);
    },
    [updateFilter]
  );

  const setDateRange = useCallback(
    (dateFrom?: string, dateTo?: string) => {
      setFilters((prev) => ({
        ...prev,
        dateFrom,
        dateTo,
      }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasActiveFilters = useMemo(() => {
    return Object.keys(filters).length > 0;
  }, [filters]);

  return {
    filters,
    updateFilter,
    setStatus,
    setInstructor,
    setLicenseCategory,
    setSearch,
    setDateRange,
    clearFilters,
    hasActiveFilters,
  };
}

import { useState, useCallback } from 'react';
import type { CreateStudentDTO, UpdateStudentDTO } from '../types/student.types';
import { LicenseCategory, StudentStatus } from '@/shared/constants/config';

interface StudentFormData {
  name: string;
  bsnNumber: string;
  email: string;
  phone: string;
  alternativePhone: string;
  dateOfBirth: string;
  address: string;
  licenseCategory: LicenseCategory;
  instructorId: string;
  notes: string;
  status?: StudentStatus;
}

/**
 * Custom hook for managing student form state and validation
 */
export function useStudentForm(initialData?: Partial<StudentFormData>) {
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    bsnNumber: '',
    email: '',
    phone: '',
    alternativePhone: '',
    dateOfBirth: '',
    address: '',
    licenseCategory: LicenseCategory.B,
    instructorId: '',
    notes: '',
    ...initialData,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof StudentFormData, boolean>>>({});

  const updateField = useCallback((field: keyof StudentFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when field is updated
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  }, []);

  const setFieldTouched = useCallback((field: keyof StudentFormData) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof StudentFormData, string>> = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Naam is verplicht';
    }

    if (!formData.bsnNumber.trim()) {
      newErrors.bsnNumber = 'BSN nummer is verplicht';
    } else if (!/^\d{9}$/.test(formData.bsnNumber.replace(/\s/g, ''))) {
      newErrors.bsnNumber = 'BSN moet 9 cijfers bevatten';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is verplicht';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ongeldig email adres';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefoonnummer is verplicht';
    } else if (!/^(\+31|0)[1-9]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Ongeldig telefoonnummer';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Geboortedatum is verplicht';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Adres is verplicht';
    }

    if (!formData.instructorId) {
      newErrors.instructorId = 'Instructeur is verplicht';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const reset = useCallback((data?: Partial<StudentFormData>) => {
    setFormData({
      name: '',
      bsnNumber: '',
      email: '',
      phone: '',
      alternativePhone: '',
      dateOfBirth: '',
      address: '',
      licenseCategory: LicenseCategory.B,
      instructorId: '',
      notes: '',
      ...data,
    });
    setErrors({});
    setTouched({});
  }, []);

  const getCreateDTO = (): CreateStudentDTO => ({
    name: formData.name,
    bsnNumber: formData.bsnNumber,
    email: formData.email,
    phone: formData.phone,
    alternativePhone: formData.alternativePhone || undefined,
    dateOfBirth: formData.dateOfBirth,
    address: formData.address,
    licenseCategory: formData.licenseCategory,
    instructorId: formData.instructorId,
    notes: formData.notes || undefined,
  });

  const getUpdateDTO = (): UpdateStudentDTO => ({
    ...getCreateDTO(),
    status: formData.status,
  });

  const isValid = Object.keys(errors).length === 0;
  const isDirty = Object.keys(touched).length > 0;

  return {
    formData,
    errors,
    touched,
    updateField,
    setFieldTouched,
    validate,
    reset,
    getCreateDTO,
    getUpdateDTO,
    isValid,
    isDirty,
  };
}

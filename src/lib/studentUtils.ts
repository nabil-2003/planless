import type { Data_Student } from '@/components/admin/ui/tables/StudentTable';

export const parseStudents = (student: any[]): Data_Student[] => {
  const s: Data_Student[] = student?.map(item => ({
    id: item?.id,
    student: item?.name,
    bsn_nummer: '_',
    email: item?.email,
    date_birth: item?.birthdate,
    city: item?.city,
    post_code: item?.zipCode,
    street: item?.street,
    house_number: item?.houseNumber,
    phone_number: item?.phone,
    status: item?.active ? 'Actief' : 'Inactief',
    driving_license_category: '_',
    theory_exam: '_',
    practical_exam: '_',
    number_of_lessons: 0,
    last_lesson: '_',
    instructor: '_',
    remarks: '_',
  }));
  return s == null ? [] : s;
};

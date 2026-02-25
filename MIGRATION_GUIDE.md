# 🚀 Architecture Migration Guide

## Overview

This guide explains how to use the new clean architecture implemented in this project. The refactoring introduces:

- ✅ Proper TypeScript types (no more `any`)
- ✅ Service layer abstraction
- ✅ Feature-based folder structure
- ✅ Reusable hooks
- ✅ Centralized error handling
- ✅ Environment configuration

---

## 📁 New Folder Structure

```
src/
├── features/               # Feature modules (domain-driven)
│   ├── students/
│   │   ├── components/     # Student-specific components
│   │   ├── hooks/          # Student-specific hooks
│   │   ├── services/       # Student API service
│   │   └── types/          # Student types
│   ├── instructors/
│   ├── lessons/
│   └── finances/
│
└── shared/                 # Shared across all features
    ├── components/ui/      # Reusable UI components
    ├── hooks/              # Global hooks
    ├── services/api/       # API client
    ├── types/              # Shared types
    ├── utils/              # Utility functions
    └── constants/          # App constants
```

---

## 🔧 How to Use

### 1. Environment Setup

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_GOOGLE_MAPS_KEY` - Your Google Maps API key

### 2. Using Services

Services abstract all API calls. Never call `fetch` or `axios` directly in components.

```typescript
// ❌ OLD WAY - Don't do this
const fetchStudents = async () => {
  const res = await fetch('/api/students');
  const data = await res.json();
  setStudents(data);
};

// ✅ NEW WAY - Use services
import { studentService } from '@/features/students/services/studentService';

const students = await studentService.getAll();
```

### 3. Using Custom Hooks

Hooks encapsulate business logic and data fetching:

```typescript
import { useStudents } from '@/features/students/hooks/useStudents';

function StudentList() {
  const { students, loading, error, refetch } = useStudents();
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      {students.map(student => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}
```

### 4. Form Management

Use the form hooks for validation and state management:

```typescript
import { useStudentForm } from '@/features/students/hooks/useStudentForm';
import { useStudentMutations } from '@/features/students/hooks/useStudents';

function CreateStudentForm() {
  const form = useStudentForm();
  const { createStudent, loading } = useStudentMutations();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.validate()) return;
    
    const student = await createStudent(form.getCreateDTO());
    if (student) {
      // Success
      router.push('/admin-panel/students');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={form.formData.name}
        onChange={(e) => form.updateField('name', e.target.value)}
        onBlur={() => form.setFieldTouched('name')}
        error={form.touched.name && form.errors.name}
      />
      {/* ... other fields */}
      <Button type="submit" loading={loading}>
        Create Student
      </Button>
    </form>
  );
}
```

### 5. Using Utility Functions

```typescript
import { formatCurrency } from '@/shared/utils/format/currency';
import { formatDate } from '@/shared/utils/format/date';
import { formatPhoneNumber } from '@/shared/utils/format/string';

// Currency
formatCurrency(150.50); // "€ 150,50"

// Dates
formatDate('2024-03-15'); // "15/03/2024"
formatDateTime('2024-03-15T14:30:00'); // "15/03/2024 14:30"

// Phone
formatPhoneNumber('0612345678'); // "06 12345678"
```

### 6. Using Constants

```typescript
import { ROUTES } from '@/shared/constants/routes';
import { APP_CONFIG, PaymentStatus } from '@/shared/constants/config';

// Routes
router.push(ROUTES.STUDENTS.LIST);
router.push(ROUTES.STUDENTS.DETAILS(studentId));

// Enums
if (invoice.paymentStatus === PaymentStatus.PAID) {
  // ...
}

// Config
<Pagination pageSize={APP_CONFIG.DEFAULT_PAGE_SIZE} />
```

### 7. Error Handling

All API errors are caught and typed:

```typescript
import type { ApiError } from '@/shared/types';

const { students, error } = useStudents();

if (error) {
  console.log(error.message); // User-friendly message
  console.log(error.statusCode); // HTTP status
  console.log(error.code); // Error code
}
```

---

## 📝 Example: Complete Feature Component

Here's a complete example showing best practices:

```typescript
// features/students/components/StudentTable.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStudents, useStudentMutations } from '../hooks/useStudents';
import { useStudentFilters } from '../hooks/useStudentFilters';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { ROUTES } from '@/shared/constants/routes';
import { formatDate, formatPhoneNumber } from '@/shared/utils/format';

export function StudentTable() {
  const router = useRouter();
  const filters = useStudentFilters();
  const debouncedSearch = useDebounce(filters.filters.search, 300);
  
  const { students, loading, error, refetch } = useStudents({
    ...filters.filters,
    search: debouncedSearch,
  });
  
  const { deleteStudent } = useStudentMutations();
  
  const handleView = (id: string) => {
    router.push(ROUTES.STUDENTS.DETAILS(id));
  };
  
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      const success = await deleteStudent(id);
      if (success) {
        refetch();
      }
    }
  };
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      <SearchInput
        value={filters.filters.search || ''}
        onChange={filters.setSearch}
      />
      
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{formatPhoneNumber(student.phone)}</td>
              <td><StatusBadge status={student.status} /></td>
              <td>
                <Button onClick={() => handleView(student.id)}>View</Button>
                <Button onClick={() => handleDelete(student.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
```

---

## 🔄 Migration Steps

### For Existing Components:

1. **Replace Redux with Hooks**
   ```typescript
   // OLD
   const students = useSelector(state => state.student.students);
   const dispatch = useDispatch();
   
   // NEW  
   const { students } = useStudents();
   ```

2. **Use Services Instead of Direct Fetch**
   ```typescript
   // OLD
   const res = await fetch('/api/students');
   
   // NEW
   const students = await studentService.getAll();
   ```

3. **Add Proper Types**
   ```typescript
   // OLD
   const [student, setStudent] = useState<any>(null);
   
   // NEW
   import type { Student } from '@/features/students/types/student.types';
   const [student, setStudent] = useState<Student | null>(null);
   ```

4. **Use Constants**
   ```typescript
   // OLD
   router.push('/admin-panel/students');
   
   // NEW
   router.push(ROUTES.STUDENTS.LIST);
   ```

---

## 📦 Required Dependencies

Install these if not already present:

```bash
npm install axios date-fns
npm install -D @types/node
```

---

## 🎯 Next Steps

1. **Implement Backend API Routes** that match the service contracts
2. **Replace JSON mock data** with real database calls
3. **Add React Query** for better cache management (optional but recommended)
4. **Write unit tests** for services and hooks
5. **Add form validation library** like Zod or Yup

---

## 💡 Tips

- **Always use TypeScript types** - no more `any`
- **Keep components small** - max 250 lines
- **One responsibility per file**
- **Use hooks for logic** - keep components presentational
- **Centralize constants** - never hardcode values
- **Handle errors gracefully** - always show user-friendly messages

---

## 🆘 Common Issues

### Issue: Module not found errors

**Solution:** Make sure `tsconfig.json` has the paths configured:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue: API calls return 404

**Solution:** Backend API routes need to be implemented. The services expect:
- `/api/students` → for student operations
- `/api/instructors` → for instructor operations
- etc.

---

## 📚 Further Reading

- [Clean Architecture Principles](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

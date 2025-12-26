// ============================================
// CENTRALIZED TYPE DEFINITIONS
// ============================================

// -------------------- User Types --------------------
export type User = any | null;
export type StudentFinancialData = {
  id: number;
  student_naam?: string;
  factuurdatum: string;
  vervaldatum: string;
  betalingsstatus: string;
  rijlesstatus: string;
  factuur_bedrag: string;
}

export type InstructorFinancialData = {
  id: number;
  instructeur: string;
  rijles_datum: string;
  betalingsstatus: string;
  rijlesstatus: string;
  urenregistratie: string;
}

export type ColorAndStatus = {
  colortext: string
  status: string
  colorbg: string
}
export type UserState = {
  user: User;
  loading: boolean;
  error: string | null;
  otpSended?: boolean | null;
  otpCode?: string | null;
  resetEmail?: string | null;
  isPasswordChanged: boolean;
  isLogin: boolean;
};

// -------------------- Student Types --------------------
export type StudentState = {
  students: Array<any>;
  student: any;
  loading: boolean;
  planning: any;
  error: string | null;
  pageSize: number;
  indexPage: number;
  total: number;
  search: string;
};

// -------------------- Instructor Types --------------------
export type InstructorState = {
  instructors: Array<any>;
  instructor: any;
  planning: any;
  loading: boolean;
  error: string | null;
  indexPage: number;
  pageSize: number;
  total: number;
  search: string;
};

// -------------------- Lesson Types --------------------
export type LessonState = {
  lessons: Array<any>;
  lesson: any;
  loading: boolean;
  error: string | null;
  indexPage: number;
  pageSize: number;
  total: number;
  search: string;
  status: string;
  startDate: string;
  endDate: string;
};

export interface ParsedLesson {
  id: string;
  instructor: string | null;
  student: string | null;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  price: string;
  status: string;
  paymentStatus: string;
}

// -------------------- Dashboard Types --------------------
export type DashboardState = {
  statistics: any;
  charts: any;
  loading: boolean;
  error: string | null;
};

// -------------------- API Types --------------------
export type LoginCredentials = {
  email: string;
  password: string;
};

export type PaginationParams = {
  index: number;
  size: number;
  search: string;
};

export type LessonFilters = {
  pageN: number;
  pageSize: number;
  startDate: string;
  endDate: string;
  status: string;
  search: string;
};

// -------------------- Component Types --------------------
export type ModalRef = {
  open: () => void;
  close: () => void;
};

export type ActionModalRef = ModalRef;

export type CustomDateRef = {
  open: () => void;
  close: () => void;
};

export type EventSchedule = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status?: string;
};

export interface User {
  id: string;
  name: string;
  email: string;
  schoolName: string;
  avatar?: string;
  studentId: string;
  class: string;
  section: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  color: string;
}

export interface AttendanceRecord {
  id: string;
  subjectId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  period: number;
  remarks?: string;
}

export interface AttendanceSummary {
  subjectId: string;
  totalClasses: number;
  presentClasses: number;
  absentClasses: number;
  lateClasses: number;
  percentage: number;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  subjects: string[];
  photo?: string;
  officeHours: string;
  designation: string;
  experience: string;
}

export interface QuickLink {
  id: string;
  title: string;
  icon: string;
  badge?: number;
  route: string;
  color: string;
}
export interface User {
  classId: string;
  classRoom: string;
  enrollment: string;
  grade: string;
  institutionName: string;
  institutionPhone: string;
  name: string;
  rollNo: string;
  section: string;
  teacherEmail: string;
  teacherName: string;
  teacherPhone: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User[] | null;
  loading: boolean;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  color: string;
}

export type AttendanceRecord = {
  id: string;
  studentId: string;
  subjectId: string | null;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
};

export interface AttendanceSummary {
  subjectId: string;
  totalClasses: number;
  presentClasses: number;
  absentClasses: number;
  lateClasses: number;
  percentage: number;
}


export type TeacherInfo = {
  classTeacherName: string;
  classTeacherEmail: string;
  classTeacherPhone: string;
  classTeacherId: string;
  classTeacherEmployeeId:string;
  subjects: SubjectInfo[];
};

export type SubjectInfo = {
  subjectName: string;
  subjectCode: string;
  teacherName: string;
  teacherEmail: string;
  teacherPhone: string;
  teacherEmployeeId: string;
  teacherId:string;
};


export type Faculty = TeacherInfo[];

export interface QuickLink {
  id: string;
  title: string;
  icon: string;
  badge?: number;
  route: string;
  color: string;
}



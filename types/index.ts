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

export interface SubjectAttendace {
  subjectCode: string;
  subjectName: string;
  absent: number;
  present: number;
  total: number;
  percentage:number
}

export type DailyAttendace ={
  presentDays: string;
  absentDays: string;
  totalDays: number;
  attendanceRate: number;
  attendanceLog: [{
  id:string,
  status:string,
  date:Date
  }];
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




// Type for Fine (you can extend later if fine has properties)
interface Fine {
  id?: string;
  reason?: string;
  amount?: number;
}

// Type for each transaction
interface Transaction {
  id: string;
  studentFeeId: string;
  amount: number;
  paymentMode: "ONLINE" | "OFFLINE" | "CASH" | "CARD"; // extend if needed
  transactionId: string;
  paidAt: string; // ISO date string
}

// Type for student fee details
export interface StudentFee {
  id: string;
  name: string;
  grade: string;
  section: string;
  enrollment: string;
  rollNo: string;
  dueAmount: number;
  totalPayable: number;
  totalPaid: number;
  transcation: Transaction[];
  fine: Fine[];
}

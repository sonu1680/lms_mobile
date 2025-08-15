import { Subject, AttendanceRecord, AttendanceSummary, Faculty, QuickLink } from '@/types';

export const mockSubjects: Subject[] = [
  { id: '1', name: 'Mathematics', code: 'MATH101', teacher: 'Dr. Smith', color: '#3B82F6' },
  { id: '2', name: 'Physics', code: 'PHY101', teacher: 'Prof. Johnson', color: '#10B981' },
  { id: '3', name: 'Chemistry', code: 'CHEM101', teacher: 'Dr. Brown', color: '#F59E0B' },
  { id: '4', name: 'Computer Science', code: 'CS101', teacher: 'Mr. Wilson', color: '#8B5CF6' },
  { id: '5', name: 'English', code: 'ENG101', teacher: 'Ms. Davis', color: '#EF4444' }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  { id: '1', subjectId: '1', date: '2024-01-15', status: 'present', period: 1 },
  { id: '2', subjectId: '1', date: '2024-01-14', status: 'present', period: 1 },
  { id: '3', subjectId: '1', date: '2024-01-13', status: 'absent', period: 1 },
  { id: '4', subjectId: '2', date: '2024-01-15', status: 'present', period: 2 },
  { id: '5', subjectId: '2', date: '2024-01-14', status: 'late', period: 2 },
  { id: '6', subjectId: '3', date: '2024-01-15', status: 'present', period: 3 }
];

export const mockAttendanceSummary: AttendanceSummary[] = [
  { subjectId: '1', totalClasses: 20, presentClasses: 18, absentClasses: 2, lateClasses: 0, percentage: 90 },
  { subjectId: '2', totalClasses: 18, presentClasses: 15, absentClasses: 2, lateClasses: 1, percentage: 83.3 },
  { subjectId: '3', totalClasses: 22, presentClasses: 20, absentClasses: 1, lateClasses: 1, percentage: 90.9 },
  { subjectId: '4', totalClasses: 16, presentClasses: 14, absentClasses: 2, lateClasses: 0, percentage: 87.5 },
  { subjectId: '5', totalClasses: 19, presentClasses: 17, absentClasses: 1, lateClasses: 1, percentage: 89.5 }
];

export const mockFaculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Robert Smith',
    email: 'r.smith@university.edu',
    phone: '+1 234-567-8901',
    department: 'Mathematics',
    subjects: ['Mathematics', 'Statistics'],
    officeHours: 'Mon-Wed 2:00 PM - 4:00 PM',
    designation: 'Professor',
    experience: '15 years'
  },
  {
    id: '2',
    name: 'Prof. Sarah Johnson',
    email: 's.johnson@university.edu',
    phone: '+1 234-567-8902',
    department: 'Physics',
    subjects: ['Physics', 'Quantum Mechanics'],
    officeHours: 'Tue-Thu 10:00 AM - 12:00 PM',
    designation: 'Associate Professor',
    experience: '12 years'
  },
  {
    id: '3',
    name: 'Dr. Michael Brown',
    email: 'm.brown@university.edu',
    phone: '+1 234-567-8903',
    department: 'Chemistry',
    subjects: ['Chemistry', 'Organic Chemistry'],
    officeHours: 'Mon-Fri 1:00 PM - 2:00 PM',
    designation: 'Professor',
    experience: '18 years'
  },
  {
    id: '4',
    name: 'Mr. David Wilson',
    email: 'd.wilson@university.edu',
    phone: '+1 234-567-8904',
    department: 'Computer Science',
    subjects: ['Programming', 'Data Structures'],
    officeHours: 'Wed-Fri 3:00 PM - 5:00 PM',
    designation: 'Assistant Professor',
    experience: '8 years'
  },
  {
    id: '5',
    name: 'Ms. Emily Davis',
    email: 'e.davis@university.edu',
    phone: '+1 234-567-8905',
    department: 'English',
    subjects: ['English Literature', 'Creative Writing'],
    officeHours: 'Tue-Thu 11:00 AM - 1:00 PM',
    designation: 'Associate Professor',
    experience: '10 years'
  }
];

export const mockQuickLinks: QuickLink[] = [
  { id: '1', title: 'Attendance', icon: 'calendar-check', badge: 2, route: 'attendance', color: '#3B82F6' },
  { id: '2', title: 'Faculty', icon: 'users', route: 'faculty', color: '#10B981' },
  { id: '3', title: 'Marks', icon: 'award', badge: 1, route: 'marks', color: '#F59E0B' },
  { id: '4', title: 'Timetable', icon: 'clock', route: 'timetable', color: '#8B5CF6' },
  { id: '5', title: 'Notices', icon: 'bell', badge: 5, route: 'notices', color: '#EF4444' },
  { id: '6', title: 'Library', icon: 'book-open', route: 'library', color: '#06B6D4' }
];
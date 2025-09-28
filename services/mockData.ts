import { Subject, AttendanceRecord, AttendanceSummary, Faculty, QuickLink } from '@/types';

export const mockSubjects: Subject[] = [
  { id: '1', name: 'Mathematics', code: 'MATH101', teacher: 'Dr. Smith', color: '#3B82F6' },
  { id: '2', name: 'Physics', code: 'PHY101', teacher: 'Prof. Johnson', color: '#10B981' },
  { id: '3', name: 'Chemistry', code: 'CHEM101', teacher: 'Dr. Brown', color: '#F59E0B' },
  { id: '4', name: 'Computer Science', code: 'CS101', teacher: 'Mr. Wilson', color: '#8B5CF6' },
  { id: '5', name: 'English', code: 'ENG101', teacher: 'Ms. Davis', color: '#EF4444' }
];



export const mockAttendanceSummary: AttendanceSummary[] = [
  { subjectId: '1', totalClasses: 20, presentClasses: 18, absentClasses: 2, lateClasses: 0, percentage: 90 },
  { subjectId: '2', totalClasses: 18, presentClasses: 15, absentClasses: 2, lateClasses: 1, percentage: 83.3 },
  { subjectId: '3', totalClasses: 22, presentClasses: 20, absentClasses: 1, lateClasses: 1, percentage: 90.9 },
  { subjectId: '4', totalClasses: 16, presentClasses: 14, absentClasses: 2, lateClasses: 0, percentage: 87.5 },
  { subjectId: '5', totalClasses: 19, presentClasses: 17, absentClasses: 1, lateClasses: 1, percentage: 89.5 }
];

  export const DAILY_ATTENDANCE = [
    {
      id: 1,
      status: 'PRESENT',
      date: Date.now(),
      checkin: Date.now(),
      checkout: Date.now(),
    },
    {
      id: 2,
      status: 'ABSENT',
      date: Date.now(),
      checkin: Date.now(),
      checkout: Date.now(),
    },
  ];

export const mockQuickLinks: QuickLink[] = [
  { id: '1', title: 'Attendance', icon: 'calendar-check', route: 'attendance', color: '#3B82F6' },
  { id: '2', title: 'Faculty', icon: 'users', route: 'faculty', color: '#10B981' },
  { id: '3', title: 'Result', icon: 'award', route: 'result', color: '#F59E0B' },
  { id: '4', title: 'Timetable', icon: 'clock', route: 'timetable', color: '#8B5CF6' },
  { id: '5', title: 'Notices', icon: 'bell', badge: 5, route: 'notices', color: '#EF4444' },
  { id: '6', title: 'Library', icon: 'book-open', route: 'library', color: '#06B6D4' },
    { id: '7', title: 'Fees', icon: 'wallet', route: 'fee', color: '#F4A2D4' }

];
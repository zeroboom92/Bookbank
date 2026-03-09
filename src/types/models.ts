export type UserRole = 'teacher' | 'student';

export interface UserProfile {
  role: UserRole;
  teacherName?: string;
  realName?: string;
  teacherId?: string;
  classId?: string;
  studentNo?: number;
}

export interface Entry {
  teacherId: string;
  studentUid: string;
  studentRealName: string;
  bookId: string;
  title: string;
  coverUrl: string;
  review: string;
  createdAt?: unknown;
}

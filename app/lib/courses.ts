import type { Course } from '@/types'

export const courses: Course[] = [
  {
    code: 'CS-101',
    name: 'Introduction to Computer Science',
    professor: 'Dr. Smith',
    slot: 'A',
    location: 'A1'
  },
  {
    code: 'MATH-201',
    name: 'Linear Algebra',
    professor: 'Dr. Johnson',
    slot: 'B',
    location: 'B2'
  },
  {
    code: 'PHY-301',
    name: 'Quantum Mechanics',
    professor: 'Dr. Brown',
    slot: 'C',
    location: 'C3'
  },
  {
    code: 'ENG-102',
    name: 'Technical Writing',
    professor: 'Prof. Davis',
    slot: 'C',
    location: 'D2'
  },
  {
    code: 'CS-201P',
    name: 'Data Structures Lab',
    professor: 'Dr. Wilson',
    slot: 'L1',
    location: 'Lab Slot-1'
  }
]

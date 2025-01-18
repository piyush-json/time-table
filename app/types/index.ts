import type { days, timeSlots } from '@/lib/const'

export type Slot =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'L1'
  | 'L2'
  | 'L3'
  | 'L4'
  | 'L5'
  | 'FS'

export interface Course {
  code: string
  name: string
  professor: string
  slot: Slot
  location: string
}

export type Days = (typeof days)[keyof typeof days]
export type TimeSlot = (typeof timeSlots)[keyof typeof timeSlots]

export type TimetableType = {
  day: Days
  timeSlot: {
    time: TimeSlot
    course: Course | null
  }[]
}[]

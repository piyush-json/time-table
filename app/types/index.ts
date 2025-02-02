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
  | 'FS1'
  | 'IDS'
  | 'NS'

export interface Course {
  code: string
  name: string
  professor: string | null
  slot: Slot
  location: string | null
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

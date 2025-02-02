export const days = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday'
} as const

export const timeSlots = {
  S1: '8:00-8:50',
  S2: '9:00-9:50',
  S3: '10:00-10:50',
  S4: '11:00-11:50',
  S5: '12:00-12:50',
  SR: '13:00-13:50',
  S6: '14:00-17:00',
  S7: '17:00-17:50'
} as const
export const slots = [
  {
    name: 'A',
    times: [
      { day: days.MONDAY, time: timeSlots.S1 },
      { day: days.TUESDAY, time: timeSlots.S3 },
      { day: days.THURSDAY, time: timeSlots.S5 },
      { day: days.FRIDAY, time: timeSlots.S5 }
    ]
  },
  {
    name: 'B',
    times: [
      { day: days.MONDAY, time: timeSlots.S2 },
      { day: days.TUESDAY, time: timeSlots.S5 },
      { day: days.THURSDAY, time: timeSlots.S1 },
      { day: days.FRIDAY, time: timeSlots.S7 }
    ]
  },
  {
    name: 'C',
    times: [
      { day: days.MONDAY, time: timeSlots.S3 },
      { day: days.TUESDAY, time: timeSlots.S7 },
      { day: days.WEDNESDAY, time: timeSlots.S1 },
      { day: days.THURSDAY, time: timeSlots.S4 }
    ]
  },
  {
    name: 'D',
    times: [
      { day: days.MONDAY, time: timeSlots.S4 },
      { day: days.WEDNESDAY, time: timeSlots.S4 },
      { day: days.THURSDAY, time: timeSlots.S2 }
    ]
  },
  {
    name: 'E',
    times: [
      { day: days.MONDAY, time: timeSlots.S5 },
      { day: days.WEDNESDAY, time: timeSlots.S2 },
      { day: days.THURSDAY, time: timeSlots.S7 },
      { day: days.FRIDAY, time: timeSlots.S2 }
    ]
  },
  {
    name: 'F',
    times: [
      { day: days.MONDAY, time: timeSlots.S7 },
      { day: days.TUESDAY, time: timeSlots.S1 },
      { day: days.WEDNESDAY, time: timeSlots.S5 },
      { day: days.FRIDAY, time: timeSlots.S4 }
    ]
  },
  {
    name: 'G',
    times: [
      { day: days.TUESDAY, time: timeSlots.S2 },
      { day: days.WEDNESDAY, time: timeSlots.S3 },
      { day: days.FRIDAY, time: timeSlots.S3 }
    ]
  },
  {
    name: 'H',
    times: [
      { day: days.TUESDAY, time: timeSlots.S4 },
      { day: days.THURSDAY, time: timeSlots.S3 },
      { day: days.FRIDAY, time: timeSlots.S1 }
    ]
  },
  {
    name: 'FS',
    times: [
      { day: days.MONDAY, time: timeSlots.S7 },
      { day: days.TUESDAY, time: timeSlots.S7 },
      { day: days.WEDNESDAY, time: timeSlots.S7 },
      { day: days.THURSDAY, time: timeSlots.S7 },
      { day: days.FRIDAY, time: timeSlots.S7 }
    ]
  },
  {
    name: 'FS1',
    times: [
      { day: days.MONDAY, time: timeSlots.S7 },
      { day: days.WEDNESDAY, time: timeSlots.S7 },
      { day: days.FRIDAY, time: timeSlots.S7 }
    ]
  },
  {
    name: 'IDS',
    times: [
      { day: days.MONDAY, time: timeSlots.SR },
      { day: days.FRIDAY, time: timeSlots.S6 }
    ]
  },
  {
    name: 'L1',
    times: [{ day: days.MONDAY, time: timeSlots.S6 }]
  },
  {
    name: 'L2',
    times: [{ day: days.TUESDAY, time: timeSlots.S6 }]
  },
  {
    name: 'L3',
    times: [{ day: days.WEDNESDAY, time: timeSlots.S6 }]
  },
  {
    name: 'L4',
    times: [{ day: days.THURSDAY, time: timeSlots.S6 }]
  },
  {
    name: 'L5',
    times: [{ day: days.FRIDAY, time: timeSlots.S6 }]
  }
]

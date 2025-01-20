import type { Course, Days, TimeSlot, TimetableType } from '@/types'
import { timeSlots } from '@/lib/const'
import { CourseCard } from './CourseCard'
import CourseSelectionDialog from './CourseSelectionDialog'
import { courses } from '@/lib/courses'
import { Plus } from 'lucide-react'

interface TimetableProps {
  timetable: TimetableType
  deleteTimeSlot: (day: Days, time: TimeSlot) => void
  setTimeTable: (timetable: TimetableType) => void
}
const Timetable = ({
  timetable,
  deleteTimeSlot,
  setTimeTable
}: TimetableProps) => {
  const handleCourseSelect = (course: Course, day: Days, time: TimeSlot) => {
    console.log(course, day, time)
    const newTimetable = timetable.map((slot) => {
      if (day != slot.day) return slot
      const newTimeSlot = slot.timeSlot.map((t) => {
        if (t.time != time) return t
        return { time, course }
      })
      return { day, timeSlot: newTimeSlot }
    })
    setTimeTable(newTimetable)
  }
  return (
    <div className='bg-white shadow rounded-lg p-4 overflow-x-auto timetable w-full'>
      <table className=' border-collapse min-w-full'>
        <colgroup>
          <col style={{ width: '80px' }} />
          {Object.values(timeSlots).map((slot) => (
            <col
              key={slot}
              style={{
                width:
                  slot === '14:00-17:00' ? 'calc(100% / 4)' : 'calc(100% / 8)',
                minWidth: slot === '14:00-17:00' ? '200px' : '100px'
              }}
            />
          ))}
        </colgroup>

        <thead>
          <tr className='bg-gray-100'>
            <th className='border p-2 text-xs'>Day/Slot</th>
            {Object.values(timeSlots).map((slot) => (
              <th key={slot} className='border p-2 text-xs'>
                {slot}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {timetable.map(({ day, timeSlot }) => (
            <tr key={day}>
              <td className='border p-2 font-medium text-xs bg-gray-100 h-20 text-center'>
                {day}
              </td>
              {timeSlot.map(({ time, course }) => (
                <td key={`${day}-${time}`} className='border p-2 h-20'>
                  {course ? (
                    <CourseCard
                      course={course}
                      deleteTimeSlot={() => deleteTimeSlot(day, time)}
                    />
                  ) : (
                    <CourseSelectionDialog
                      courses={courses}
                      selectedCourses={[]}
                      onCourseSelect={(course) =>
                        handleCourseSelect(course, day, time)
                      }
                    >
                      <div className='h-14 flex items-center justify-center cursor-pointer'>
                        <Plus className='text-gray-300' />
                      </div>
                    </CourseSelectionDialog>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Timetable

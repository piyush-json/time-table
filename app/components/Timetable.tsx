import type { TimetableType } from '@/types'
import { timeSlots } from '@/lib/const'
import { CourseCard } from './CourseCard'

interface TimetableProps {
  timetable: TimetableType
}

const Timetable = ({ timetable }: TimetableProps) => {
  return (
    <div className='bg-white shadow rounded-lg p-4 overflow-x-auto timetable w-full'>
      <table className=' border-collapse w-fit'>
        <colgroup>
          <col style={{ width: '100px' }} />
          {Object.values(timeSlots).map((slot) => (
            <col
              key={slot}
              style={{
                width: slot === '14:00-17:00' ? '200px' : '100px'
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
              <td className='border p-2 font-medium text-xs bg-gray-100 h-20'>
                {day}
              </td>
              {timeSlot.map(({ time, course }) => (
                <td key={`${day}-${time}`} className='border p-2 h-20'>
                  {course ? (
                    <CourseCard course={course} />
                  ) : (
                    <div className='min-w-24 w-full h-14' />
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

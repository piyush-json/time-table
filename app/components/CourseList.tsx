import type { Course } from '../types'

interface CourseListProps {
  courses: Course[]
  selectedCourses: Course[]
  onCourseSelect: (course: Course) => void
}

const CourseList = ({ selectedCourses, onCourseSelect }: CourseListProps) => {
  return (
    <div className='bg-white shadow rounded-lg p-4 grow'>
      <h2 className='text-xl font-semibold mb-4'>Selected Courses</h2>
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-2'>
        {selectedCourses.map((course) => (
          <div
            key={`${course.code}-${course.slot}-${course.name}`}
            className={`p-2 rounded cursor-pointer ${
              selectedCourses.some((c) => c.code === course.code)
                ? 'bg-blue-100 hover:bg-blue-200'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => onCourseSelect(course)}
          >
            <h3 className='font-medium'>{course.name}</h3>
            <p className='text-sm text-gray-600'>
              {course.code} - {course.professor}
            </p>
            <p className='text-xs text-gray-500'>Slots: {course.slot}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseList

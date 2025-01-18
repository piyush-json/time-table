import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import CourseList from './CourseList'
import Timetable from './Timetable'
import ShareTimetable from './ShareTimetable'
import CourseSelectionDialog from './CourseSelectionDialog'
import type { Course, TimetableType } from '@/types'
import { Button } from '@/components/ui/button'
import { days, slots, timeSlots } from '@/lib/const'
import { courses } from '@/lib/courses'

const TimetableGenerator = () => {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([])
  const [timetable, setTimetable] = useState<TimetableType>([])
  const [showDialog, setShowDialog] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const coursesParam = searchParams.get('courses')
    if (coursesParam) {
      const selectedCourseCodes = coursesParam.split(',')
      const preSelectedCourses = courses.filter((course: Course) =>
        selectedCourseCodes.includes(course.code)
      )
      setSelectedCourses(preSelectedCourses)
      updateTimetable(preSelectedCourses)
    }

    // const emptyTimetable = Object.values(days).map((day) => ({
    //   day,
    //   timeSlot: Object.values(timeSlots).map((time) => ({ time, course: null }))
    // }))
    // setTimetable(emptyTimetable)
  }, [searchParams])

  const handleCourseSelect = (course: Course) => {
    if (selectedCourses.some((c) => c.code === course.code)) {
      setSelectedCourses(selectedCourses.filter((c) => c.code !== course.code))
      return
    }
    const newSelectedCourses = [...selectedCourses, course]
    const conflict = isValidTimetable(newSelectedCourses)
    if (conflict) {
      alert(
        `This course conflicts with your current schedule. ${conflict[0]} and ${conflict[1]} are scheduled at the same time slot ${conflict[2]}`
      )
      return
    }
    setSelectedCourses(
      newSelectedCourses.sort((a, b) => a.slot.localeCompare(b.slot))
    )
    setSelectedCourses(newSelectedCourses)
    updateTimetable(newSelectedCourses)
    updateSearchParams(newSelectedCourses)
    return
  }

  const isValidTimetable = (courses: Course[]) => {
    const slotOccupancy: Record<string, string> = {}
    for (const course of courses) {
      if (slotOccupancy[course.slot]) {
        return [course.code, slotOccupancy[course.slot], course.slot] as const
      }
      slotOccupancy[course.slot] = course.code
    }
    return null
  }

  const updateTimetable = (courses: Course[]) => {
    const newTimetable = Object.values(days).map((day) => ({
      day,
      timeSlot: Object.values(timeSlots).map((time) => {
        const course = courses.find((c) =>
          slots
            .find((slot) => slot.name === c.slot)
            ?.times.find((slot) => slot.day === day && slot.time === time)
        )
        return {
          time,
          course: course || null
        }
      })
    }))
    setTimetable(newTimetable)
  }

  const updateSearchParams = (courses: Course[]) => {
    const courseCodes = courses.map((course) => course.code).join(',')
    setSearchParams({ courses: courseCodes })
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='w-ful'>
        <Timetable timetable={timetable} />
      </div>
      <div className='flex max-sm:flex-col gap-4'>
        <div>
          <Button onClick={() => setShowDialog(true)} className='w-full'>
            Open Course Selection
          </Button>
          <ShareTimetable
            selectedCourses={selectedCourses}
            timeTable={timetable}
          />
        </div>
        <CourseList
          courses={courses}
          selectedCourses={selectedCourses}
          onCourseSelect={handleCourseSelect}
        />
      </div>
      {showDialog && (
        <CourseSelectionDialog
          courses={courses}
          selectedCourses={selectedCourses}
          onCourseSelect={handleCourseSelect}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  )
}

export default TimetableGenerator

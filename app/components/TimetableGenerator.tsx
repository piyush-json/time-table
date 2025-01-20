import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import CourseList from './CourseList'
import Timetable from './Timetable'
import ShareTimetable from './ShareTimetable'
import CourseSelectionDialog from './CourseSelectionDialog'
import type { Course, Days, TimeSlot, TimetableType } from '@/types'
import { Button } from '@/components/ui/button'
import { days, slots, timeSlots } from '@/lib/const'
import { courses } from '@/lib/courses'

const TimetableGenerator = () => {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([])
  const [timetable, setTimetable] = useState<TimetableType>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [showDialog, setShowDialog] = useState(!searchParams.has('courses'))

  useEffect(() => {
    const coursesParam = searchParams.get('courses')
    if (coursesParam) {
      const selectedCourseCodes = coursesParam.split(',')
      const preSelectedCourses = courses.filter(
        (course: Course, i, acc) =>
          selectedCourseCodes.includes(course.code) &&
          acc.findIndex((c) => c.code === course.code) === i
      )
      setSelectedCourses(preSelectedCourses)
      updateTimetable(preSelectedCourses)
    }
  }, [])

  const handleCourseSelect = (course: Course) => {
    const isSelected = selectedCourses.some(
      (c) => c.code === course.code && c.name === course.name
    )
    const updatedCourses = isSelected
      ? selectedCourses.filter(
          (c) => c.code !== course.code || c.name !== course.name
        )
      : [...selectedCourses, course]

    if (!isSelected) {
      const conflict = isValidTimetable(selectedCourses, course)
      if (conflict) {
        alert(
          `This course conflicts with your current schedule. ${conflict[0]} and ${conflict[1]} are scheduled at the same time slot ${conflict[2]}`
        )
        return
      }
    }

    setSelectedCourses(updatedCourses)
    updateTimetable(updatedCourses)
    updateSearchParams(updatedCourses)
  }

  const isValidTimetable = (courses: Course[], newCourse: Course) => {
    const clashCourse = courses.find((course) => course.slot === newCourse.slot)
    return clashCourse
      ? ([newCourse.code, clashCourse.code, newCourse.slot] as const)
      : null
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

  const deleteTimeSlot = (day: Days, time: TimeSlot) => {
    const newTimetable = timetable.map((slot) => {
      if (slot.day !== day) return slot
      return {
        day: slot.day,
        timeSlot: slot.timeSlot.map((s) => {
          if (s.time !== time) return s
          return {
            time: s.time,
            course: null
          }
        })
      }
    })
    setTimetable(newTimetable)
    const shouldUpdate = selectedCourses.findIndex(
      (c) =>
        !newTimetable.some(({ timeSlot }) =>
          timeSlot.some(
            (s) =>
              s.course?.code === c.code &&
              s.course?.slot === c.slot &&
              s.course?.name === c.name
          )
        )
    )
    if (shouldUpdate === -1) return
    const updatedCourses = Array.from(selectedCourses)
    updatedCourses.splice(shouldUpdate, 1)
    setSelectedCourses(updatedCourses)
    updateSearchParams(updatedCourses)
  }

  const updateSearchParams = (courses: Course[]) => {
    if (courses.length === 0) {
      setSearchParams({})
      return
    }
    const courseCodes = courses.map((course) => course.code).join(',')
    setSearchParams({ courses: courseCodes })
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='w-full'>
        <Timetable timetable={timetable} deleteTimeSlot={deleteTimeSlot} />
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

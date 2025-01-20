import { useState, useEffect } from 'react'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Course } from '../types'
import { MapPin } from 'lucide-react'

interface CourseSelectionDialogProps {
  courses: Course[]
  selectedCourses: Course[]
  onCourseSelect: (course: Course) => void
  onClose: () => void
}

const CourseSelectionDialog = ({
  courses,
  selectedCourses,
  onCourseSelect,
  onClose
}: CourseSelectionDialogProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCourses, setFilteredCourses] = useState(courses)

  useEffect(() => {
    const filtered = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.professor?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCourses(filtered)
  }, [searchTerm, courses])

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50'>
        <div className='bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col'>
          <div className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>Select Your Courses</h2>
            <Input
              type='text'
              placeholder='Search courses, professors, or rooms...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='mb-4'
            />
            <div className='overflow-y-auto max-h-[60vh] sm:max-h-[55vh]'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2'>
                {filteredCourses.map((course) => (
                  <div
                    key={`${course.code}-${course.slot}-${course.name}`}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedCourses.some(
                        (c) => c.code === course.code && c.name === course.name
                      )
                        ? 'bg-blue-100 hover:bg-blue-200'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => onCourseSelect(course)}
                  >
                    <h3 className='font-medium'>{course.name}</h3>
                    <p className='text-sm text-gray-600'>
                      {course.code}
                      {course.professor ? ` - ${course.professor}` : ''}
                    </p>
                    {course.location && (
                      <p className='text-xs text-gray-500 mt-1 flex items-center'>
                        <MapPin className='h-3 w-3 mr-1' />
                        Room {course.location}
                      </p>
                    )}
                    <p className='text-xs text-gray-500'>
                      Slots: {course.slot}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex justify-end p-6 bg-gray-50'>
            <Button onClick={handleClose}>Done</Button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default CourseSelectionDialog

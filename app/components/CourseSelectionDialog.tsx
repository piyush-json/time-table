import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Course, Slot } from '../types'
import { MapPin } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface CourseSelectionDialogProps {
  courses: Course[]
  selectedCourses: Course[]
  onCourseSelect: (course: Course) => void
  children: React.ReactNode
  initialOpen?: boolean
}

const CourseSelectionDialog = ({
  courses,
  selectedCourses,
  onCourseSelect,
  children,
  initialOpen = false
}: CourseSelectionDialogProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [formData, setFormData] = useState<Course | null>()
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
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col p-6'>
        {!formData ? (
          <div>
            <DialogTitle className='text-2xl font-bold mb-4'>
              Select Your Courses
            </DialogTitle>
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
                      selectedCourses.find(
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
        ) : (
          <>
            <DialogTitle className='text-2xl font-bold mb-4'>
              Add a course manually
            </DialogTitle>
            <form
              className='space-y-2 p-2 sm:w-1/2 '
              onSubmit={() => {
                onCourseSelect(formData)
                // setIsOpen(false)
                setFormData(null)
              }}
            >
              <Input
                id='name'
                placeholder='Course name'
                value={formData.name || ''}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className='bg-background/50 rounded-[8px] border-2 shadow-none'
              />
              <Input
                id='code'
                placeholder='Course code'
                value={formData.code || ''}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                required
                className='bg-background/50 rounded-[8px] border-2 shadow-none'
              />
              <Input
                id='professor'
                placeholder='Professor'
                value={formData.professor || ''}
                onChange={(e) =>
                  setFormData({ ...formData, professor: e.target.value })
                }
                className='bg-background/50 rounded-[8px] border-2 shadow-none'
              />
              <Select
                value={formData.slot}
                onValueChange={(value: Slot) =>
                  setFormData({ ...formData, slot: value })
                }
              >
                <SelectTrigger className='bg-background/50 text-muted-foreground rounded-[8px] border-2 shadow-none'>
                  <SelectValue placeholder='select slot' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='A'>A</SelectItem>
                  <SelectItem value='B'>B</SelectItem>
                  <SelectItem value='C'>C</SelectItem>
                  <SelectItem value='D'>D</SelectItem>
                  <SelectItem value='E'>E</SelectItem>
                  <SelectItem value='F'>F</SelectItem>
                  <SelectItem value='G'>G</SelectItem>
                  <SelectItem value='H'>H</SelectItem>
                  <SelectItem value='L1'>L1</SelectItem>
                  <SelectItem value='L2'>L2</SelectItem>
                  <SelectItem value='L3'>L3</SelectItem>
                  <SelectItem value='L4'>L4</SelectItem>
                  <SelectItem value='L5'>L5</SelectItem>
                  <SelectItem value='NS'>NS</SelectItem>
                  <SelectItem value='FS'>FS</SelectItem>
                </SelectContent>
              </Select>
              <Button type='submit' variant='secondary'>
                Add
              </Button>
            </form>
          </>
        )}
        <DialogFooter className='flex justify-between  w-full'>
          <Button
            variant='secondary'
            onClick={() => {
              formData
                ? setFormData(null)
                : setFormData({
                    name: '',
                    code: '',
                    professor: '',
                    slot: 'A',
                    location: ''
                  })
            }}
          >
            {formData ? 'Search instead' : ' Add manually'}
          </Button>
          <Button onClick={handleClose}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CourseSelectionDialog

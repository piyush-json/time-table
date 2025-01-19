import { getColor } from '@/lib/helpers'
import type { Course } from '@/types'
import { MapPin } from 'lucide-react'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip'

export const CourseCard = ({ course }: { course: Course }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className='p-2 rounded min-w-24 w-full h-14'
            style={{ backgroundColor: getColor(course.slot) }}
          >
            <p className='font-medium text-xs flex justify-between'>
              <span>{course.code}</span>
              <span>{course.slot}</span>
            </p>
            {!!course.location && (
              <p className='text-[10px] flex items-center mt-1 text-gray-700'>
                <MapPin className='h-2 w-2 mr-1 ' />
                Room {course.location}
              </p>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className='bg-gray-200 text-foreground'>
          <p>{course.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

import { useState } from 'react'
import type { Course, Days, TimetableType } from '../types'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ShareTimetableProps {
  selectedCourses: Course[]
  timeTable: TimetableType
}

const ShareTimetable = ({
  selectedCourses,
  timeTable
}: ShareTimetableProps) => {
  const [shareLink, setShareLink] = useState('')

  const generateShareLink = () => {
    if (!selectedCourses.length) {
      alert('Please select some courses first!')
      return
    }
    const courseCodes = selectedCourses.map((course) => course.code).join(',')
    const link = `${window.location.origin}?courses=${encodeURIComponent(
      courseCodes
    )}`
    setShareLink(link)
  }

  const downloadTimetable = () => {
    if (!selectedCourses.length) {
      alert('Please select some courses first!')
      return
    }
    const timetableElement = document.querySelector('.timetable')
    if (timetableElement) {
      const clone = timetableElement.cloneNode(true) as HTMLElement
      const deleteButtons = clone.querySelectorAll('.del')
      deleteButtons.forEach((button) => button.remove())
      const canvasDiv = document.createElement('div')
      canvasDiv.appendChild(clone)
      canvasDiv.style.position = 'absolute'
      canvasDiv.style.top = '-1000000px'
      document.body.appendChild(canvasDiv)
      canvasDiv.style.width = `${timetableElement?.scrollWidth}px`
      canvasDiv.style.height = `${timetableElement?.scrollHeight}px`
      html2canvas(canvasDiv).then((canvas) => {
        const link = document.createElement('a')
        link.download = 'timetable.png'
        link.href = canvas.toDataURL()
        link.click()
      })
      document.body.removeChild(canvasDiv)
    }
  }

  const findNearestDate = (dayCode: Days) => {
    const dayMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6
    }
    const today = new Date()
    const todayDay = today.getDay()
    const targetDay = dayMap[dayCode]
    const diff = (targetDay - todayDay + 7) % 7 || 7
    const nearestDate = new Date(today)
    nearestDate.setDate(today.getDate() + diff)
    return nearestDate
  }

  const formatICalendarEvent = (course: Course, time: string, day: Days) => {
    const dayMap = {
      Monday: 'MO',
      Tuesday: 'TU',
      Wednesday: 'WE',
      Thursday: 'TH',
      Friday: 'FR',
      Saturday: 'SA',
      Sunday: 'SU'
    }

    const [startTime, endTime] = time.split('-')
    const padTime = (time: string) => {
      return time.length === 4 ? `0${time}` : time
    }
    const nearestDate = findNearestDate(day)
    const startDateTime = new Date(
      `${nearestDate.toISOString().split('T')[0]}T${padTime(startTime)}:00`
    )
    const endDateTime = new Date(
      `${nearestDate.toISOString().split('T')[0]}T${padTime(endTime)}:00`
    )
    const startDateTimeStr = startDateTime
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0]
    const endDateTimeStr = endDateTime
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0]
    const descripton = `${course.name}${
      course.location ? ` at ${course.location}` : ''
    }${course.professor ? `by ${course.professor}` : ''}`.slice(0, 70)
    return `BEGIN:VEVENT
SUMMARY:${course.code}${course.location ? ` ${course.location}` : ''}
DTSTART:${startDateTimeStr}Z
DTEND:${endDateTimeStr}Z
RRULE:FREQ=WEEKLY;BYDAY=${dayMap[day]}
DESCRIPTION:${descripton}.
END:VEVENT
`
  }

  const addToGoogleCalendar = () => {
    if (!selectedCourses.length) {
      alert('Please select some courses first!')
      return
    }

    let icsData =
      'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//okpsh//tt-okpsh//EN\n'
    timeTable.forEach((day) => {
      day.timeSlot.forEach(({ course, time }) => {
        if (course) {
          icsData += formatICalendarEvent(course, time, day.day)
        }
      })
    })

    icsData += 'END:VCALENDAR'

    const blob = new Blob([icsData], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'courses.ics'
    link.click()

    const googleCalendarLink =
      'https://calendar.google.com/calendar/r/settings/export'
    window.open(googleCalendarLink, '_blank')
  }

  return (
    <div className='mt-4 space-y-4'>
      <Button className='w-full' onClick={generateShareLink}>
        Generate Share Link
      </Button>
      {shareLink && (
        <div className='bg-gray-100 p-2 rounded'>
          <p className='text-sm mb-2'>Share this link:</p>
          <Input
            type='text'
            value={shareLink}
            readOnly
            className='w-full p-1 text-sm'
          />
        </div>
      )}
      <Button className='w-full' onClick={downloadTimetable}>
        Download as PNG
      </Button>
      <Button className='w-full' onClick={addToGoogleCalendar}>
        Add to Google Calendar
      </Button>
    </div>
  )
}

export default ShareTimetable

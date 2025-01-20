import TimetableGenerator from '@/components/TimetableGenerator'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' }
  ]
}

export default function Home() {
  return (
    <main className='container mx-auto p-4 flex flex-col min-h-svh'>
      <h1 className='text-3xl font-bold mb-4'>
        Personalized Timetable Generator
      </h1>
      <div className='hidden' />
      <div className='w-full grow'>
        <TimetableGenerator />
      </div>
      <footer className='mt-8 text-center hover:underline underline-offset-2 text-gray-700'>
        <a href='https://github.com/piyush-panpaliya/time-table'>
          made with ❤️ by PSH
        </a>
      </footer>
    </main>
  )
}

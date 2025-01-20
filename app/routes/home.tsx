import TimetableGenerator from '@/components/TimetableGenerator'
import type { Route } from './+types/home'
import { Suspense } from 'react'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' }
  ]
}

export default function Home() {
  return (
    <main className='container mx-auto p-4 grow'>
      <h1 className='text-3xl font-bold mb-4'>
        Personalized Timetable Generator
      </h1>
      <div className='hidden' />
      <TimetableGenerator />
    </main>
  )
}

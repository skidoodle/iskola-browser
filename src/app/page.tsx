'use client'

import { useState, useMemo } from 'react'
import useSWR from 'swr'
import Link from 'next/link'

interface School {
  instituteId: number
  instituteCode: string
  name: string
  city: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { data: schools } = useSWR<School[]>('/instituteList.json', fetcher)

  const filteredSchools = useMemo(() => {
    if (!schools) return []

    return schools.filter(
      (school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.instituteCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.instituteId.toString().includes(searchTerm)
    )
  }, [searchTerm, schools])

  return (
    <>
      <div className='container mx-auto p-8 bg-gray-800 text-white'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Iskola keresése...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='p-4 pl-8 mb-10 border rounded text-white bg-gray-600 w-full outline-none font-bold'
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredSchools.map((school) => (
            <div
              key={school.instituteCode}
              className='p-4 border rounded shadow-md relative transition duration-300 transform hover:scale-105 flex flex-col h-full'
            >
              <h2 className='text-xl font-bold mb-4'>
                {school.name.replace(/"/g, '')}
              </h2>
              <div className='flex-grow'></div>
              <p className='text-sm mb-2'>{school.city}</p>
              <p className='text-sm mb-2'>{school.instituteId}</p>
              <Link
                key={school.instituteCode}
                href={`https://${school.instituteCode}.e-kreta.hu`}
                target='_blank'
              >
                <p className='text-sm underline'>{school.instituteCode}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home

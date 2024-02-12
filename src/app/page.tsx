'use client'

import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

interface School {
  city: string
  instituteCode: string
  name: string
}

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [schools, setSchools] = useState<School[]>([])
  const [filteredSchools, setFilteredSchools] = useState<School[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<School[]>(
          'https://api.refilc.hu/v1/public/school-list'
        )
        setSchools(response.data)
      } catch (error) {
        console.error('Error fetching school data:', error)
      }
    }

    void fetchData()
  }, [])

  useEffect(() => {
    const filtered = schools.filter(
      (school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.instituteCode.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredSchools(filtered)
  }, [searchTerm, schools])

  const memoizedFilteredSchools = useMemo(
    () => filteredSchools,
    [filteredSchools]
  )

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
          {memoizedFilteredSchools.map((school) => (
            <div
              key={school.instituteCode}
              className='p-4 border rounded shadow-md relative transition duration-300 transform hover:scale-105 flex flex-col h-full'
            >
              <h2 className='text-xl font-bold mb-4'>
                {school.name.replace(/"/g, '')}
              </h2>
              <div className='flex-grow'></div>
              <p className='text-sm mb-2'>{school.city}</p>
              <p className='text-sm'>{school.instituteCode}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home

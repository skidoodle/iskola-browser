'use client'

import React, { useEffect, useState, useMemo } from 'react'
import {
  Pagination,
  Spinner,
  Input,
  Card,
  CardHeader,
  CardFooter,
} from '@nextui-org/react'
import useSWR from 'swr'
import Link from 'next/link'
import { SearchIcon } from '@/components/SearchIcon'
import { truncate } from '@/utils/truncate'
import { fetcher } from '@/utils/fetcher'
import { removeAccents } from '@/utils/normalize'
import { Footer } from '@/components/Footer'
import type { School } from '@/utils/interface'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 21
  const { data: schools, isValidating } = useSWR<School[]>('/api/list', fetcher)

  const normalizedSearchTerm = removeAccents(searchTerm.toLowerCase())
  const filteredSchools = useMemo(() => {
    if (!schools) return []

    return schools.filter(
      (school) =>
        removeAccents(school.name.toLowerCase()).includes(
          normalizedSearchTerm
        ) ||
        removeAccents(school.city.toLowerCase()).includes(
          normalizedSearchTerm
        ) ||
        removeAccents(school.instituteCode.toLowerCase()).includes(
          normalizedSearchTerm
        )
    )
  }, [normalizedSearchTerm, schools])

  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage)

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  const currentItems = filteredSchools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (!schools || isValidating)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner size='lg' />
      </div>
    )

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <div className='container mx-auto p-8 bg-slate-950 text-white/90 flex-grow'>
          <div className='relative mb-5'>
            <Input
              isClearable
              onClear={() => setSearchTerm('')}
              radius='lg'
              classNames={{
                label: 'text-black/50 dark:text-white/90',
                input: [
                  'bg-transparent',
                  'text-black/90 dark:text-white/90',
                  'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                ],
                innerWrapper: 'bg-transparent',
                inputWrapper: [
                  'shadow-xl',
                  'bg-default-200/50',
                  'dark:bg-default/60',
                  'backdrop-blur-xl',
                  'backdrop-saturate-200',
                  'hover:bg-default-200/70',
                  'dark:hover:bg-default/70',
                  'group-data-[focused=true]:bg-default-200/50',
                  'dark:group-data-[focused=true]:bg-default/60',
                  '!cursor-text',
                ],
              }}
              placeholder='Iskola keresése...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={
                <SearchIcon className='text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
              }
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {currentItems.map((school) => (
              <Card
                key={school.instituteCode}
                shadow='lg'
                className='p-3 h-[200px] relative md:w-full lg:w-full transition duration-300 transform hover:scale-[102%] bg-slate-800/40'
              >
                <CardHeader>
                  <h2 className='text-md font-bold mt-5'>
                    {truncate(school.name, 100)}
                  </h2>
                </CardHeader>
                <CardFooter>
                  <p className='text-xs mb-2 fixed bottom-10'>{school.city}</p>
                  <Link href={school.url} target='_blank'>
                    <p className='text-sm underline fixed bottom-5'>
                      {school.instituteCode}
                    </p>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className='mt-10' />
          <div className='fixed bottom-5 left-1/2 transform -translate-x-1/2'>
            <Pagination
              showControls
              isCompact
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={paginate}
              size='sm'
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

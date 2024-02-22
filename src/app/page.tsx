'use client'

import { useEffect, useState, useMemo } from 'react'
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
import { Source } from '@/components/Source'
import { Config } from '@/utils/config'
import type { CsvData } from '@/utils/interface'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: schools, isValidating } = useSWR<CsvData[]>(Config.api, fetcher)

  const normalize = (value: string) => removeAccents(value.toLowerCase())

  const filteredSchools = useMemo(() => {
    if (!schools) return []

    const nSearchTerm = normalize(searchTerm)

    return schools.filter((school) => {
      const nSchoolName = normalize(school['intézmény neve (székhely)'] || '')
      const nCity = normalize(
        school['intézmény címe település (székhely)'] || ''
      )
      const nInstituteCode = normalize(school['intézmény OM kódja'] || '')

      return (
        nSchoolName.includes(nSearchTerm) ||
        nCity.includes(nSearchTerm) ||
        nInstituteCode.includes(nSearchTerm)
      )
    })
  }, [searchTerm, schools])

  const totalPages = Math.ceil(filteredSchools.length / Config.itemsPerPage)

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  const currentItems = filteredSchools.slice(
    (currentPage - 1) * Config.itemsPerPage,
    currentPage * Config.itemsPerPage
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
      <div className='container mx-auto p-8 bg-slate-950 text-white/90 flex-grow relative'>
        <div className='relative mb-5 w-56 flex items-center'>
          <Input
            isClearable
            onClear={() => setSearchTerm('')}
            radius='lg'
            size='sm'
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
        <Source />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {currentItems.map((school) => (
            <Card
              key={school['intézmény OM kódja']}
              shadow='lg'
              className='p-3 h-[200px] relative md:w-full lg:w-full transition duration-300 transform hover:scale-[102%] bg-slate-800/40'
            >
              <CardHeader>
                <h2 className='text-md font-bold mt-5'>
                  {truncate(school['intézmény neve (székhely)'], 100)}
                </h2>
              </CardHeader>
              <CardFooter>
                <p className='text-xs mb-2 fixed bottom-10'>
                  {school['intézmény címe település (székhely)']}
                </p>
                {school.url ? (
                  <Link href={school.url} target='_blank'>
                    <p className='text-sm underline fixed bottom-5'>
                      {school['intézmény OM kódja']}
                    </p>
                  </Link>
                ) : (
                  <p className='text-sm underline fixed bottom-5'>
                    {school['intézmény OM kódja']}
                  </p>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className='fixed bottom-5 left-1/2 transform -translate-x-1/2'>
          <Pagination
            showControls={true}
            loop={true}
            total={totalPages}
            initialPage={1}
            siblings={0}
            page={currentPage}
            onChange={paginate}
            size='lg'
            radius='lg'
          />
        </div>
        <div className='mt-10' />
      </div>
    </>
  )
}

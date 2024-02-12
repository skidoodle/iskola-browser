import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex items-center justify-center h-screen bg-slate-950 text-white'>
      <div className='text-center'>
        <h1 className='text-9xl font-bold mb-4'>404</h1>
        <p className='text-lg mb-6'>A keresett oldal nem található.</p>
        <Link
          href='/'
          className='bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600'
        >
          Vissza
        </Link>
      </div>
    </div>
  )
}

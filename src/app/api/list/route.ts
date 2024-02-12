import axios from 'axios'
import { headers } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'

const APIURL = `${process.env.APIURL}`
const CACHE_FILE_PATH = path.join(process.cwd(), 'public', 'instituteList.json')

const fetchAndCacheData = async (): Promise<void> => {
  try {
    const response = await axios.get(APIURL, {
      headers: {
        apiKey: process.env.APIKEY,
      },
    })

    await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(response.data))
  } catch (error) {
    throw new Error('Error fetching and caching data')
  }
}

export async function GET(_req: Request, _res: Response) {
  const authorization = headers().get('authorization')
  if (authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  try {
    const cacheExists = await fs
      .access(CACHE_FILE_PATH)
      .then(() => true)
      .catch(() => false)

    if (!cacheExists) {
      await fetchAndCacheData()
    }

    const cachedData = await fs.readFile(CACHE_FILE_PATH, 'utf-8')
    const parsedData = JSON.parse(cachedData) as string

    return Response.json(parsedData)
  } catch (error) {
    return Response.json({ error: 'Error handling request', message: error })
  }
}

export async function DELETE(_req: Request, _res: Response) {
  const authorization = headers().get('Authorization')
  if (authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  try {
    await fs.unlink(CACHE_FILE_PATH)
    return Response.json({ message: 'Cache deleted' })
  } catch (error) {
    return Response.json({ error: 'Error handling request', message: error })
  }
}

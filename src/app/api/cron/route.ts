import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', {
        status: 401,
      })
    }

    const protocol = request.headers.get('x-forwarded-proto') ?? 'http'
    const apiUrl = new URL(
      '/api/list',
      `${protocol}://${request.headers.get('host')}`
    )

    const deleteResponse = await fetch(apiUrl.href, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.CRON_SECRET}`,
      },
    })

    if (!deleteResponse.ok) {
      throw new Error(`Error deleting cache. Status: ${deleteResponse.status}`)
    }

    const getResponse = await fetch(apiUrl.href, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.CRON_SECRET}`,
      },
    })

    if (!getResponse.ok) {
      throw new Error(`Error fetching new data. Status: ${getResponse.status}`)
    }

    return Response.json({ message: 'Cache deleted and new data fetched' })
  } catch (error) {
    return (
      Response.json({
        error: 'Error handling request',
        message: error,
      }),
      {
        status: 500,
      }
    )
  }
}

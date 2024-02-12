import axios from 'axios'

export async function GET(_req: Request, _res: Response) {
  const APIURL = `${process.env.APIURL}`
  try {
    const response = await axios.get(APIURL, {
      headers: {
        apiKey: process.env.APIKEY,
      },
    })

    return Response.json(response.data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control':
          'max-age=604800, s-maxage=604800, stale-while-revalidate=604800',
      },
    })
  } catch (error) {
    return Response.json(
      { error: 'Error handling request', message: error },
      { status: 500 }
    )
  }
}

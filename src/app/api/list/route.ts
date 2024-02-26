import { removeAccents } from '@/utils/normalize'
import axios from 'axios'
import type { NextRequest, NextResponse } from 'next/server'
import * as x from 'xlsx'
import { Config } from '@/utils/config'

type SchoolData = Record<string, string>

let cachedData: SchoolData[] = []
let lastUpdated = 0

export async function GET(req: NextRequest, _res: NextResponse) {
  const normalizeKey = (value: string): string =>
    removeAccents(value.toLowerCase())

  try {
    const url = new URL(req.url)
    const pageQueryParam = url.searchParams.get('page')
    const requestedPage = parseInt(pageQueryParam ?? '1', 10)

    const now = Date.now()
    const cacheIsExpired = now - lastUpdated > 86400000
    if (cachedData.length === 0 || cacheIsExpired) {
      const response = await axios.get<ArrayBuffer>(
        'https://kifir2.kir.hu/TTJegyzekKereso/Home/TeljesListaXlsx',
        {
          method: 'GET',
          responseType: 'arraybuffer',
        }
      )

      const workbook = x.read(new Uint8Array(response.data))

      const sheetName = workbook.SheetNames[0]
      if (!sheetName)
        return Response.json({ error: 'No sheet found' }, { status: 500 })

      const sheet = workbook.Sheets[sheetName]
      if (!sheet)
        return Response.json({ error: 'Sheet is undefined' }, { status: 500 })

      const jsonData = x.utils.sheet_to_json(sheet, { header: 1 })
      if (!jsonData.length)
        return Response.json({ error: 'No data found' }, { status: 500 })

      const [header, ...dataRows]: Array<Array<string | number>> =
        jsonData as Array<Array<string | number>>

      if (!header || !Array.isArray(dataRows)) {
        return Response.json({ error: 'Invalid data' }, { status: 500 })
      }

      cachedData = dataRows.map((row: Array<string | number>) => {
        const school: SchoolData = {}
        row.forEach((value, index) => {
          const key = normalizeKey(header[index] as string)
          school[key] = String(value)
        })
        return school
      })

      lastUpdated = now
    }

    const totalPages = Math.ceil(cachedData.length / Config.ITEM_COUNT)

    if (requestedPage > totalPages) {
      return Response.json({ error: 'Invalid page' }, { status: 400 })
    }

    const startIndex = (requestedPage - 1) * Config.ITEM_COUNT
    const endIndex = startIndex + Config.ITEM_COUNT

    const pageData = cachedData.slice(startIndex, endIndex)

    return Response.json({
      currentPage: requestedPage,
      totalPages,
      data: pageData,
    })
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 })
  }
}

import type { NextResponse, NextRequest } from 'next/server'
import axios from 'axios'
import * as xlsx from 'xlsx'

export async function GET(_req: NextRequest, _res: NextResponse) {
  const APIURL = 'https://kifir2.kir.hu/TTJegyzekKereso/Home/TeljesListaXlsx'

  try {
    const response = await axios.get(APIURL, {
      method: 'GET',
      responseType: 'arraybuffer',
      headers: {
        apiKey: process.env.APIKEY,
      },
    })

    const dataBuffer = response.data as Buffer
    const workbook: xlsx.WorkBook = xlsx.read(dataBuffer, { type: 'buffer' })

    const sheetName = workbook.SheetNames[0]

    if (!sheetName) {
      return Response.json({ error: 'No sheet found' }, { status: 500 })
    }

    const sheet: xlsx.WorkSheet = workbook.Sheets[sheetName]!

    const jsonData = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
    })

    return Response.json(jsonData as unknown as string, { status: 200 })
  } catch (error) {
    return Response.json(
      { error: 'Error handling request', message: error },
      { status: 500 }
    )
  }
}

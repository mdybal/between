import { list } from '@vercel/blob'

export const runtime = 'edge'

export async function GET() {
  const { blobs } = await list()

  return Response.json(
    blobs.map((blob) => ({
      url: blob.url,
      filename: blob.pathname.split('/').at(-1) ?? blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    })),
  )
}

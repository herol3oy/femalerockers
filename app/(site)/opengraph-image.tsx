import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'About Female Rockers'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  const interSemiBold = await readFile(
    join(process.cwd(), 'assets/Inter-Bold.woff'),
  )

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          color: '#0f172a',
          fontFamily: '"Inter"',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        ></div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: '4rem',
            paddingRight: '4rem',
          }}
        >
          <h2
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '4.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              textWrap: 'balance',
            }}
          >
            Female Rockers
          </h2>
          <div style={{ fontSize: '1.875rem', color: '#64748b' }}>
            Future Sensations in Rock
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}

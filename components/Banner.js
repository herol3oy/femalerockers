import { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@BS/Container'
import Row from '@BS/Row'

export default function Banner() {
  const [banner, setBanner] = useState(true)

  return (
    banner && (
      <Container fluid className='banner'>
        <Row className='py-2'>
          <small className='fw-bold text-light text-center'>
            📣 Try your chance of being interviewed by tagging us on {` `}
            <Link href='https://www.instagram.com/femalerockers_/'>
              <a>instagram</a>
            </Link>
            <button
              onClick={() => setBanner(false)}
              type='button'
              className='btn-close bg-light small'
              aria-label='Close'
            ></button>
          </small>
        </Row>
      </Container>
    )
  )
}

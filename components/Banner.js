import { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@BS/Container'
import Row from '@BS/Row'

export default function Banner() {
  const [banner, setBanner] = useState(false)

  useEffect(() => {
    setBanner(true)
    // setTimeout(() => {
    //   setBanner(false)
    // }, 5000);
  }, [])

  return banner ? (
    <Container fluid className='banner '>
      <Row>
        <p className='fw-bold text-light text-center py-2 m-0'>
          📣 Try your chance of being interviewed by tagging us on {` `}
          <Link href='https://www.instagram.com/femalerockers_/'>
            <a>instagram</a>
          </Link>
          {/* <button
            onClick={() => setBanner((p) => !p)}
            type='button'
            className='btn-close'
            aria-label='Close'
          ></button> */}
        </p>
      </Row>
    </Container>
  ) : null
}

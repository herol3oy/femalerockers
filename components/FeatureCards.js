import Container from '@BS/Container'
import Row from '@BS/Row'
import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

export default function FeatureCards() {
  return (
    <Container fluid>
      <Row className='my-5'>
        <section className='col-12 col-lg-4 col-md-6 d-flex flex-column justify-content-center text-light mb-3 mb-lg-0'>
          <p className='fw-bold text-danger'>#AllGirlsBand🔥</p>
          <p className='h2 fw-lighter'>
            Read our interviews with All Girls Bands to find out
            about their advanture
          </p>
        </section>

        <section className='col-12 col-lg-8 col-md-6'>
          <Row>
            <Carousel ssr={true} responsive={responsive}>
              {[1, 2, 3, 4, 5].map((i) => {
                return (
                  <div key={i} className='row'>
                    <div className='col-4 col-md-4 col-lg-4 p-0'>
                      <Image
                        className=''
                        src='/image.jpeg'
                        layout='responsive'
                        objectFit='cover'
                        width={170}
                        height={170}
                        alt='FR'
                      />
                    </div>
                    <div className='col-8 col-md-8 col-lg-8 text-light d-flex flex-column align-items-stretch p-0 '>
                      <div className='card-body bg-dark'>
                        <h4 className='fw-bold interview__title'>
                          An advanture with drum
                        </h4>
                        <p className='card-text d-none d-lg-block'>
                          This is a wider card with supporting text below
                          something really goes here if you wanna be here jus
                          client her asdh asnda l askdal asdkalsk
                        </p>
                        <p className='card-text'>
                          <small className='text-muted'>
                            Last updated 3 mins ago
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Carousel>
          </Row>
        </section>
      </Row>
    </Container>
  )
}

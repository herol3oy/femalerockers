import Carousel from '@BS/Carousel'
import Container from '@BS/Container'
import Shimmer from '../skeletons/Shimmer'

export default function CarouselSkeleton() {
  return (
    <Container className='skeleton-wrapper my-3'>
      <Carousel
        style={{ height: '520px' }}
        className='carousel bg-dark '
        prevLabel=''
        nextLabel=''
      ></Carousel>
      <Shimmer />
    </Container>
  )
}

import Card from '@BS/Card'
import Shimmer from '../skeletons/Shimmer'

export default function CardSkeleton() {
  return (
    <div className='col-6 col-lg-2 skeleton-wrapper'>
      <Card
        bg='dark'
        style={{ height: '260px' }}
        className=' border-0 border-top border-danger border-2 rounded-top rounded-bottom'
      ></Card>
      <Shimmer />
    </div>
  )
}

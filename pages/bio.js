import Link from 'next/link'
import Container from '@BS/Container'
import Row from '@BS/Row'
import Button from '@BS/Button'
import Image from '@BS/Image'
import Col from '@BS/Col'

export default function bio() {
	return (
		<Container className='min-vh-100'>
			<Row className=' text-center d-flex justify-content-center'>
				<Col xs={12}>
					<Image
						src='/femalerocker-profile.jpg'
						className='border'
						width={100}
						roundedCircle
					/>
					<p className='text-light fw-bold mb-4 mt-2'>@femalerockers_</p>
				</Col>
				<Col xs={12} md={8}>
					<a href='https://twitter.com/femalerockers_' target='_blank'>
						<Button className='p-3 mb-3 w-100'>Twitter</Button>
					</a>
					<Link href='/'>
						<a>
							<Button className='p-3 w-100'>Website</Button>
						</a>
					</Link>
					<Image
						src='/logo.png'
                        className='mt-5'
						width={25}
						style={{ filter: 'grayscale(0)' }}
					/>
				</Col>
			</Row>
		</Container>
	)
}

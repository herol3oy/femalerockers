import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Image from 'next/image'

export default function carousel() {
    return (
        <Container>
            <Carousel prevLabel='' nextLabel=''>
                <Carousel.Item>
                    <Image
                        className="d-block"
                        src="/1.jpg"
                        alt="First slide"
                        layout="responsive"
                        width={800}
                        height={520}
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block"
                        src="/2.jpg"
                        alt="First slide"
                        layout="responsive"
                        width={800}
                        height={520}
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block"
                        src="/3.jpg"
                        alt="First slide"
                        layout="responsive"
                        width={800}
                        height={520}
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    )
}

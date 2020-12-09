import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'

export default function Rockers() {
    return (
        <Container >
            <Row>
                <Card className="col-6 col-lg-2 p-0 bg-dark text-white">
                    <Card.Img src="/profile.jpg" alt="Card image" />
                    <Card.ImgOverlay>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            Abby K
                    </Card.Text>
                        <Card.Text>Guitaris</Card.Text>
                    </Card.ImgOverlay>
                </Card>
                <Card className="col-6 col-lg-2 p-0 bg-dark text-white">
                    <Card.Img src="/profile.jpg" alt="Card image" />
                    <Card.ImgOverlay>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            Abby K
                    </Card.Text>
                        <Card.Text>Guitaris</Card.Text>
                    </Card.ImgOverlay>
                </Card>
            </Row>
        </Container>
    )
}

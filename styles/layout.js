
import styled from 'styled-components'
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

export const StyledTitle = styled.h2`
    background: linear-gradient(45deg,#f09433,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

export const BgWrap = styled.section`
    height: 100vh;
    overflow: hidden;
    display:flex;
    z-index: -1;

    &::after {  
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: inline-block;
        background: linear-gradient(to top, #000000 0%, rgba(255, 255, 255, 0) 100%);
}
`
export const StyledInfoBox = styled.section`
    position: absolute;
    bottom: 0;
    left: 6wh;
    z-index: 99999;
    color: red;
`

export const StyledCarousel = styled(Carousel)`
    &::after {
        display:flex;
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: inline-block;
        background: linear-gradient(to top, #111 0%, rgba(255, 255, 255, 0) 100%);
    }
`

export const StyledImgOverlay = styled(Card.ImgOverlay)`
    top: unset;
`

export const InstaBtn = styled.a`
    padding: 10px;
    color: #fff;
    font-weight: 700;
    border-radius: 20px;
    cursor: pointer;
    background: linear-gradient(45deg,#f09433,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888);

`

export const SiteTitle = styled.a`
    font-family: 'Cinzel', serif;
`

export const StyledQuote = styled.h3`
    font-family: 'Cinzel', serif;
`

export const StyledContainer = styled(Container)`
    background-color: #3e1721;
`
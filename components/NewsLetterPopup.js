import { useEffect, useState } from 'react'
import Container from '@BS/Container'
import Row from '@BS/Row'
import Button from '@BS/Button'

export default function NewsLetterPopup() {
  const [displayPopup, setDisplayPopup] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDisplayPopup(true)
    }, 1000 * 90)
  }, [])

  return (
    <Container
      fluid
      className='bg-dark text-light py-3 position-sticky bottom-0'
      style={{ zIndex: 99, display: `${displayPopup ? 'block' : 'none'}` }}
    >
      <Container>
        <Row className='d-flex flex-row justify-content-center '>
          <form
            method='post'
            action='https://femalerockers.us19.list-manage.com/subscribe/post?u=a1033c7d8b2c72e78fd17743a&id=fee35bc5cb'
            className='col-10 validate user'
            id='mc-embedded-subscribe-form'
            name='mc-embedded-subscribe-form'
            target='_blank'
            noValidate
          >
            <div
              className='row d-flex justify-content-center'
              id='mc_embed_signup_scroll'
            >
              <section className='col-lg-4 text-center text-lg-start mb-2 mb-lg-0'>
                <h4 className='text-danger'>
                  <strong>WHO IS NEXT?</strong>
                </h4>
                <span className=''>
                  Sign up for our newsletter
                </span>
              </section>

              <section className='col-8 col-lg-4 g-0 mc-field-group '>
                <input
                  type='email'
                  name='EMAIL'
                  tabIndex={-1}
                  autoComplete='off'
                  placeholder='your@email.com'
                  className='d-flex form-control-sm align-items-stretch border border-primary shadow flex-fill w-100 border border-1 required email'
                  id='mce-EMAIL'
                  required
                />
                <div id='mce-responses'>
                  <div
                    className='response'
                    id='mce-error-response'
                    style={{ display: 'none' }}
                  />
                  <div
                    className='response'
                    id='mce-success-response'
                    style={{ display: 'none' }}
                  />
                </div>
                <div
                  style={{ position: 'absolute', left: '-5000px' }}
                  aria-hidden='true'
                >
                  <input
                    type='text'
                    name='b_a1033c7d8b2c72e78fd17743a_fee35bc5cb'
                    tabIndex={-1}
                    defaultValue
                  />
                </div>
              </section>

              <section className='col-4 col-lg-2 g-0 gx-lg-2 gx-1 clear'>
                <input
                  type='submit'
                  value='SUBSCRIBE ›'
                  name='subscribe'
                  id='mc-embedded-subscribe'
                  className='d-flex justify-content-center w-100 button btn btn-sm btn-success'
                />
              </section>
            </div>
          </form>
          <Button
            size='sm'
            onClick={() => setDisplayPopup(false)}
            type='button'
            className='btn-close bg-light position-absolute top-50 end-0 translate-middle'
            aria-label='Close'
          ></Button>
        </Row>
      </Container>
    </Container>
  )
}

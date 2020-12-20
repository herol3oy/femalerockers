export default function NewsLetter() {
    return (
        <>

            <div className='p-5 bg-dark border-0' id='mc_embed_signup'>
            <h1 className='text-danger text-center accent-color'>
                <strong>
                    WHO IS NEXT?
                </strong>
            </h1>
            <h3 className='fw-lighter text-light text-center mb-5'>
                Subscribe to our newsletter for incomming interviews
            </h3>
                <form
                    method='post'
                    action='https://femalerockers.us19.list-manage.com/subscribe/post?u=a1033c7d8b2c72e78fd17743a&id=fee35bc5cb'
                    className='w-100 validate user'
                    id='mc-embedded-subscribe-form'
                    name='mc-embedded-subscribe-form'
                    target='_blank'
                    noValidate
                >
                    <div className='d-flex flex-column  justify-content-between' id='mc_embed_signup_scroll'>
                        <div className='mc-field-group w-100'>
                            <input
                                type='email'
                                name='EMAIL'
                                tabIndex={-1}
                                autoComplete='off'
                                placeholder='your@email.com'
                                className='d-flex rounded-0 form-control-lg align-items-stretch border border-primary shadow flex-fill w-100 border border-1 required email'
                                id='mce-EMAIL'
                                required
                            />
                        </div>
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
                        <div className='clear'>
                            <input
                                type='submit'
                                value='SUBSCRIBE ›'
                                name='subscribe'
                                id='mc-embedded-subscribe'
                                className='d-flex rounded-0 justify-content-center w-100 mt-1 button btn btn-lg btn-success'
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

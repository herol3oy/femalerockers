import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: 'ldn05m4o',
    dataset: 'production',
    useCdn: 'false'
})
import sanityClient from './SanityClient'

const musiciansHomepageData = `
    firstName,
    lastName,
    profession,
    country,
    slug,
    profileImage{
        asset->{
            _id,
            url
        },
        alt
    }
`

export async function getAllMusiciansData() {
    return await sanityClient.fetch(`*[_type == "interview"] | order(date){
        ${musiciansHomepageData}
    }`)
}
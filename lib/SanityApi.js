import sanityClient from './SanityClient'

const musiciansHomepageData = `
    stageName,
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

const interviewContentData = `
    title,
    excerpt,
    stageName,
    country,
    profession,
    profileImage,
    coverImage,
    instagram,
    spotify,
    facebook,
    twitter,
    youtube,
    website,
    date,
    body,
`

export async function getAllMusiciansData() {
    return await sanityClient.fetch(`*[_type == "interview"] | order(date){
        ${musiciansHomepageData}
    }`)
}

export async function getInterviewContent(slug) {
    return await sanityClient.fetch(`*[_type == 'interview' && slug.current == '${slug}']{
        ${interviewContentData}
    }`)
}

export async function getAllContentWithSlug() {
    return await sanityClient.fetch(`*[_type == "interview"]{ 'slug': slug.current }`);
  }
  
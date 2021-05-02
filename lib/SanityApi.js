import sanityClient from "./SanityClient";

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
`;

const interviewContentData = `
    title,
    excerpt,
    stageName,
    slug,
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
`;

const articleContent = `
    title,
    slug,
    excerpt,
    publishedAt,
    body,
`;

const pageContent = `
    title,
    slug,
    excerpt,
    publishedAt,
    body,
`;

const bioLinks = `
    title,
    url,
`;

export async function getAllMusiciansData() {
  return await sanityClient.fetch(`*[_type == "interview"] | order(date){
        ${musiciansHomepageData}
    }`);
}

export async function getInterviewContent(slug) {
  if (!slug) return [];
  return await sanityClient.fetch(`*[_type == 'interview' && slug.current == '${slug}']{
        ${interviewContentData}
    }`);
}

export async function getAllContentWithSlug() {
  return await sanityClient.fetch(
    `*[_type == 'interview']{ 'slug': slug.current }`
  );
}

export async function getAllArticleContents() {
  return await sanityClient.fetch(`*[_type == 'post']{ 'slug': slug.current }`);
}

export async function getArticleContent(slug) {
  return await sanityClient.fetch(`*[_type == 'post' && slug.current == '${slug}']{
        ${articleContent}
    }`);
}

export async function getAllPages() {
  return await sanityClient.fetch(`*[_type == 'page']{ 'slug': slug.current }`);
}

export async function getPageContent(slug) {
  return await sanityClient.fetch(`*[_type == 'page' && slug.current == '${slug}']{
        ${pageContent}
    }`);
}

export async function getBioLinks() {
  return await sanityClient.fetch(`*[_type == 'bio'] | order(queue){
        ${bioLinks}
    }`);
}

export const interviewsListQuery = `*[_type == "interview"] | order(date desc) {
  _id,
  stageName,
  slug,
  title,
  country,
  profession,
  profileImage,
  date
}`;

export const interviewDetailQuery = `*[_type == "interview" && slug.current == $slug][0] {
  _id,
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
  body[] {
    ...,
    _type == "image" => {
      ...,
      asset->
    }
  },
  quote
}`;

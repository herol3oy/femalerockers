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

export const songReviewsListQuery = `*[_type == "review"] | order(date desc) {
  _id,
  stageName,
  slug,
  title,
  date
}`;

export const songReviewDetailQuery = `*[_type == "review" && slug.current == $slug][0] {
  _id,
  title,
  stageName,
  slug,
  date,
  body[] {
    ...,
    _type == "image" => {
      ...,
      asset->
    }
  }
}`;

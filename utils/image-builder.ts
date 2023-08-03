import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
  projectId: 'ldn05m4o',
  dataset: 'production',
})

export const urlFor = (source: string) => builder.image(source)

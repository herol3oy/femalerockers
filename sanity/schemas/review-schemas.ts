export const review = {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'excerpt',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: { title: string }) =>
          doc.title.split(' ').join('-').toLowerCase(),
      },
    },
    {
      name: 'reviewImage',
      title: 'Review image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'instagram',
      type: 'string',
    },
    {
      name: 'spotify',
      type: 'string',
    },
    {
      name: 'facebook',
      type: 'string',
    },
    {
      name: 'twitter',
      type: 'string',
    },
    {
      name: 'youtube',
      type: 'string',
    },
    {
      name: 'website',
      type: 'string',
    },
    {
      name: 'date',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'reviewImage',
    },
    prepare(selection: any) {
      const { title, date, media } = selection

      return {
        title,
        media,
        subtitle: new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
        }),
      }
    },
  },
}

export const interview = {
  name: 'interview',
  title: 'Interviews',
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
      name: 'stageName',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: { stageName: string }) =>
          doc.stageName.split(' ').join('').toLowerCase(),
      },
    },
    {
      name: 'country',
      type: 'string',
    },
    {
      name: 'profession',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'profileImage',
      title: 'Profile image',
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
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    },
    {
      title: 'Quote',
      name: 'quote',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      title: 'stageName',
      date: 'date',
      media: 'profileImage',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default {
    name: "interview",
    title: "Interview",
    type: "document",
    fields: [
        {
            name: "title",
            type: "string",
        },
        {
            name: "excerpt",
            type: "string",
        },
        {
            name: "stageName",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: doc => doc.stageName.split(' ').join('').toLowerCase()
            }
        },
        {
            name: "country",
            type: "string",
        },
        {
            name: "profession",
            type: "array",
            of: [
                {
                    type: "string",
                },
            ],
            options: {
                layout: "tags",
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
            name: "instagram",
            type: "string",
        },
        {
            name: "spotify",
            type: "string",
        },
        {
            name: "facebook",
            type: "string",
        },
        {
            name: "twitter",
            type: "string",
        },
        {
            name: "youtube",
            type: "string",
        },
        {
            name: "website",
            type: "string",
        },
        {
            title: 'Publish on homepage carousel?',
            name: 'carousel',
            type: 'boolean'
        },
        {
            name: "date",
            type: "datetime",
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        },
        {
            title: 'Quote',
            name: 'quote',
            type: 'array',
            of: [{type: 'string'}]
          }
    ],
};
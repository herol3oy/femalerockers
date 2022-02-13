export default {
  name: "bio",
  title: "Bio Links",
  type: "document",
  fields: [
    {
      name: "urls",
      title: "URL",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https", "mailto", "tel"],
                }),
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      urls: "urls",
    },
    prepare(selection) {
      const { urls } = selection;
      return {
        title: "Link in Bio Page",
        subtitle: `Number of links: ${urls.length}`,
      };
    },
  },
};

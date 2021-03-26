export default {
  name: "bio",
  title: "Bio Links",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "url",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
    },
  ],
  preview: {
    select: {
      title: "title",
      url: "url",
    },
    prepare(selection) {
      const { title, url } = selection;
      return {
        title,
        subtitle: url,
      };
    },
  },
};

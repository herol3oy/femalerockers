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
    {
      name: "queue",
      type: "number",
    },
  ],
  preview: {
    select: {
      title: "title",
      url: "url",
      queue: "queue",
    },
    prepare(selection) {
      const { title, queue } = selection;
      return {
        title,
        subtitle: queue,
      };
    },
  },
};

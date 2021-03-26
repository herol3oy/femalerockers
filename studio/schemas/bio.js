export default {
  name: "bio",
  title: "Bio",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "url",
      type: "url",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
      };
    },
  },
};

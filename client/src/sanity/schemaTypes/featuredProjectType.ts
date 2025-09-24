import { defineField, defineType } from "sanity";

export const featuredProjectType = defineType({
  name: "featuredProject",
  title: "Featured project",
  type: "document",
  fields: [
    defineField({
      name: "projectName",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Films", value: "films" },
          { title: "Editorial", value: "editorial" },
          { title: "Advertising", value: "advertising" },
          { title: "Personal", value: "personal" },
        ],
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "date",
      type: "date",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "coverImage",
      type: "image",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "instagramLink",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
});

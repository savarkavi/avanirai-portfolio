import { defineField, defineType } from "sanity";

export const featuredType = defineType({
  name: "featuredProjects",
  title: "Featured Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Featured Projects",
      hidden: true,
    }),

    defineField({
      name: "projects",
      description:
        "Select and reorder the projects to feature on the homepage.",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});

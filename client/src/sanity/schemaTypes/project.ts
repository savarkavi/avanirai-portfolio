import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Projects",
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
        list: ["films", "editorial", "advertising", "personal"],
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "date",
      type: "date",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "coverMedia",
      type: "file",
      description:
        "The main image/video shown on the homepage or category page",
    }),

    defineField({
      name: "instagramLink",
      type: "url",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "gallery",
      description: "Add all the images and videos for this project here.",
      type: "array",
      of: [
        {
          title: "Image",
          type: "image",
        },
        {
          title: "video",
          type: "file",
          options: {
            accept: "video/mp4,video/webm,video/mov,video/avi",
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "projectName",
      subtitle: "category",
    },
  },
});

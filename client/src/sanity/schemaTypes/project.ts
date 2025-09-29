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
        list: ["Films", "Editorial", "Advertising", "Personal"],
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
      description: "The main image shown on the homepage.",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
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
      media: "coverImage",
    },
  },
});

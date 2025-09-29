import { defineQuery } from "next-sanity";

export const FETCH_FEATURED_PROJECTS =
  defineQuery(`*[_type == "featuredProjects"][0] {
        projects[]->{
          _id,
          projectName,
          category,
          coverImage,
          instagramLink,
          date
        }
      }
`);

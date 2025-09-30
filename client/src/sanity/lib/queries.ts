import { defineQuery } from "next-sanity";

export const FETCH_FEATURED_PROJECTS =
  defineQuery(`*[_type == "featuredProjects"][0] {
        projects[]->{
          _id,
          projectName,
          category,
          coverMedia{
            ...,
            asset->
          },
          instagramLink,
          date
        }
      }
`);

export const FETCH_PROJECT = defineQuery(
  `*[_type == "project" && _id == $projectId][0]{
    ...,
    gallery[]{
    _key,
    _type,
    alt,
    asset->{ 
      _id,
      url,
      playbackId 
    }
  }
  }`,
);

export const FETCH_CATEGORY_PROJECTS = defineQuery(
  `*[_type == "project" && category == $category]{
      _id,
      projectName,
      instagramLink,
      date,
      coverMedia{
        ...,
        asset->
      },
  }`,
);

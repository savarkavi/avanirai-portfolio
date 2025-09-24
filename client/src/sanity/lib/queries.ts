import { defineQuery } from "next-sanity";

export const FETCH_FEATURED_PROJECTS =
  defineQuery(`*[_type == "featuredProject"] {
                category, 
                coverImage {
                  asset->
                }, 
                date, 
                instagramLink, 
                projectName,
                _createdAt
              } | order(_createdAt)
`);

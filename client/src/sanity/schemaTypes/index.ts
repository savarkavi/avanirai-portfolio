import { type SchemaTypeDefinition } from "sanity";
import { projectType } from "./project";
import { featuredType } from "./featuredProjects";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, featuredType],
};

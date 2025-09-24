import { type SchemaTypeDefinition } from "sanity";
import { featuredProjectType } from "./featuredProjectType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [featuredProjectType],
};

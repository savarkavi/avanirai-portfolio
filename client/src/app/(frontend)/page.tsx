import { sanityFetch } from "@/sanity/lib/live";
import Hero from "../components/Hero";
import { FETCH_FEATURED_PROJECTS } from "@/sanity/lib/queries";
import { FeaturedProject } from "@/sanity/types";

export default async function Home() {
  const { data } = await sanityFetch({
    query: FETCH_FEATURED_PROJECTS,
  });

  console.log(data);

  return (
    <div>
      <Hero featuredProjects={data} />
    </div>
  );
}

import { sanityFetch } from "@/sanity/lib/live";
import Hero from "../components/Hero";
import { FETCH_FEATURED_PROJECTS } from "@/sanity/lib/queries";
import { FEATURED_PROJECT } from "@/lib/types";

export default async function Home() {
  const { data } = await sanityFetch({
    query: FETCH_FEATURED_PROJECTS,
  });

  return (
    <div>
      <Hero featuredProjects={data} />
    </div>
  );
}

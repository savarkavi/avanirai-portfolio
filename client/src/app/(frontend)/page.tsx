import { sanityFetch } from "@/sanity/lib/live";
import Hero from "../components/Hero";
import { FETCH_FEATURED_PROJECTS } from "@/sanity/lib/queries";
import HomeContainer from "../components/HomeContainer";

export default async function Home() {
  const { data } = await sanityFetch({
    query: FETCH_FEATURED_PROJECTS,
  });

  return <HomeContainer featuredProjects={data} />;
}

import About from "@/components/about";
import Contact from "@/components/contact";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Videos from "@/components/videos";
import Exihibition from "@/components/exhibition";

export default async function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Videos />
      <Exihibition />
      <div className="mb-16"></div>
      <Contact />
    </main>
  );
}

import About from "@/components/about";
import Contact from "@/components/contact";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Videos from "@/components/videos";
import Exihibition from "@/components/exhibition";
import Test from "@/components/test";

export default async function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      {/* <Projects />
      <div className="my-10"></div>
      <Videos />
      <div className="my-10"></div> */}
      <Projects />
      <div className="my-10"></div>
      <Videos />
      <div className="my-10"></div>
      <Exihibition />
      <div className="my-10"></div>

      {/* <Skills /> */}
      {/* <Experience /> */}
      <Contact />
    </main>
  );
}

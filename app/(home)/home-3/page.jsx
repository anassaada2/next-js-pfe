import Footer from "@/components/footer/footer";
import Header3 from "@/components/header/header-3";
import Project from "@/components/pages/home-3/project";
import Brand from "@/components/pages/home-3/brand";
import Hero from "@/components/pages/home-3/hero";
import Service from "@/components/pages/home-3/service";
import Process from "@/components/pages/home-3/process";
import Team from "@/components/pages/home-3/team";
import About from "@/components/ui/sections/about";
import Cta from "@/components/pages/home-3/cta";
import Blog from "@/components/pages/home-3/blog";

export default function Home() {
    return (
        <>
            <Header3 />
            <Hero />
            <Service />
            <About />
            <Brand />
            <Project />
            <Process />
            <Team />
            <Cta />
            <Blog />
            <Footer />
        </>
    );
}

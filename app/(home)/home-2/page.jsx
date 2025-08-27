import Footer from "@/components/footer/footer";
import Header2 from "@/components/header/header-2";
import SidebarContact from "@/components/header/ui/sidebar-contact";
import Cta from "@/components/ui/sections/cta";
import Award from "@/components/ui/sections/award";
import Contact from "@/components/ui/sections/contact";
import Content from "@/components/pages/home-2/content";
import Faq from "@/components/ui/sections/faq";
import Hero from "@/components/pages/home-2/hero";
import Project from "@/components/pages/home-2/project";
import ServicePrice from "@/components/pages/home-2/service-price";
import Stats from "@/components/ui/sections/stats";
import Testimonial from "@/components/pages/home-2/testimonial";
import Video from "@/components/ui/sections/video";

export default function Home() {
    return (
        <>
            <Header2 />
            <Hero />
            <Content />
            <Project />
            <Stats style="home-2" />
            <Award />
            <Video />
            <ServicePrice />
            <Faq />
            <Testimonial />
            <Contact />
            <Cta />
            <Footer />
            {/* offcanvas */}
            <SidebarContact />
        </>
    );
}

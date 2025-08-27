import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Banner from "@/components/ui/sections/banner";
import About from "@/components/ui/sections/about";
import Award from "@/components/ui/sections/award";
import Cta from "@/components/ui/sections/cta";
import Faq from "@/components/ui/sections/faq";
import Philosophy from "@/components/ui/sections/philosophy";
import Stats from "@/components/ui/sections/stats";
import Testimonial from "@/components/ui/sections/testimonial";
import Video from "@/components/ui/sections/video";

export default function AboutUs() {
  return (
    <>
      <Header />
      <Banner title="A PROPOS DE NOUS" pathName="a propos de nous" />
      <About />
      {/*<Stats style="about" />*/}
      {/*  <Video />*/}
      {/* <Philosophy style="about" /> */}
      <Award />
      <Testimonial />
      <Faq />
      <Cta />
      <Footer />
    </>
  );
}

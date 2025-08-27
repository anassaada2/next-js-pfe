import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import About from "@/components/pages/home-1/about";
import Article from "@/components/pages/home-1/article";
import Brand from "@/components/pages/home-1/brand";
import Cta from "@/components/pages/home-1/cta";
import Hero from "@/components/pages/home-1/hero";
import Philosophy from "@/components/ui/sections/philosophy";
import Project from "@/components/pages/home-1/project";
import Service from "@/components/pages/home-1/service";
import Team from "@/components/pages/home-1/team";
import Testimonial from "@/components/ui/sections/testimonial";
import Philosophie from "@/components/pages/home-1/philosophie/Philosophie";
import Departement from "@/components/pages/home-1/departement/Departement";
import DepartementRecherche from "@/components/pages/home-1/departement/DepartementRecherche";


export default async function Home() {
  
   
  
  return (
    <>
      <Header />
      <Hero />
      {/*    <Brand />
       */}{" "}
      <Service />
      <About />
      <Philosophie />
      {/*              <Philosophy /> */}
      <Testimonial />
      <Departement />
      <DepartementRecherche />
      {/*  
      <Article /> */}
      <Cta />
      <Footer />
    </>
  );
}

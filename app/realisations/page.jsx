import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Award from "@/components/ui/sections/award";
import Banner from "@/components/ui/sections/banner";

export default function ServicePage() {
  return (
    <>
      <Header />
      <Banner title="NOS Realisations" pathName="Nos Realisations" />
        <Award  />
      
      <Footer />
    </>
  );
}

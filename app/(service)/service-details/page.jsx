import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import ServiceDetail from "@/components/pages/service/service-detail";
import Banner from "@/components/ui/sections/banner";

export default function ServiceDetails() {
  return (
    <>
      <Header />
      <Banner title="ECO-BOOT" pathName="ECO-BOOT" />
      <ServiceDetail />
      <Footer />
    </>
  );
}

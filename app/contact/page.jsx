import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import ContactArea from "@/components/pages/contact/contact-area";
import ContactMap from "@/components/pages/contact/contact-map";
import Banner from "@/components/ui/sections/banner";

export default function Contact() {
  return (
    <>
      <Header />
      <Banner pathName="CONTACT" title="CONTACT" />
      <ContactArea />
      <ContactMap />
      <Footer />
    </>
  );
}

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Cta from "@/components/pages/faq/cta";
import FaqArea from "@/components/pages/faq/faq-area";
import Banner from "@/components/ui/sections/banner";

export default function Faq() {
    return (
        <>
            <Header />
            <Banner title="FAQS" pathName="Faqs" />
            <FaqArea />
            <Cta />
            <Footer />
        </>
    );
}

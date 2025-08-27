import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Service from "@/components/pages/pricing/service";
import Banner from "@/components/ui/sections/banner";
import Contact from "@/components/ui/sections/contact";

export default function Pricing() {
    return (
        <>
            <Header />
            <Banner title="PRICING PLANS" pathName="Pricing Plans" />
            <Service />
            <Contact />
            <Footer />
        </>
    );
}

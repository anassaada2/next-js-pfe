import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Testimonial from "@/components/pages/testimonial/testimonial";
import Banner from "@/components/ui/sections/banner";

export default function TestimonialPage() {
    return (
        <>
            <Header />
            <Banner title="TESTIMONIALS" pathName="Testimonials" />
            <Testimonial />
            <Footer />
        </>
    );
}

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import CheckoutArea from "@/components/pages/product/checkout-area";
import Banner from "@/components/ui/sections/banner";

export default function Checkout() {
    return (
        <>
            <Header />
            <Banner title="CHECKOUT" pathName="Checkout" />
            <CheckoutArea />
            <Footer />
        </>
    );
}

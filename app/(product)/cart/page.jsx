import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import CartArea from "@/components/pages/product/cart-area";
import Banner from "@/components/ui/sections/banner";

export default function Cart() {
    return (
        <>
            <Header />
            <Banner title="MY CART" pathName="My Cart" />
            <CartArea />
            <Footer />
        </>
    );
}

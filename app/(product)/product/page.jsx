import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import ProductItem from "@/components/pages/product/product-item";
import Banner from "@/components/ui/sections/banner";

export default function Product() {
    return (
        <>
            <Header />
            <Banner title="PRODUCT LIST" pathName="Product List" />
            <ProductItem />
            <Footer />
        </>
    );
}

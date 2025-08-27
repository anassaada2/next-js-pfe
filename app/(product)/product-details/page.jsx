import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import ProductInfo from "@/components/pages/product/product-info";
import RelatedProduct from "@/components/pages/product/related-product";
import Banner from "@/components/ui/sections/banner";

export default function ProductDetails() {
    return (
        <>
            <Header />
            <Banner title="WOODEN DRAWER" pathName="Wooden Drawer" />
            <ProductInfo />
            <RelatedProduct />
            <Footer />
        </>
    );
}

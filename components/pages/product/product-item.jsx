import Pagination from "@/components/ui/sections/pagination";
import SortPrice from "./ui/sort-price";
import ProductCard from "./ui/product-card";
import { products } from "@/data/site";
import ProductInfo from "./ui/product-info";

export default function ProductItem() {
    let content;

    if (products.length > 0) {
        content = products?.map((item, i) => (
            <div
                key={i}
                className="col-lg-3 col-md-4 col-xs-6 aos-init aos-animate"
                data-aos-duration={1000}
                data-aos="fade-left"
                data-aos-delay
            >
                <ProductCard data={item} />
            </div>
        ));
    }

    return (
        <div className="product-main-section section-padding-140 ">
            <div className="container">
                <div className="product-section__head mb-30">
                    <ProductInfo totla={products?.length} />
                    <SortPrice />
                </div>
                <div className="row  gutter-y-default mb-res-80">
                    {/* product card start */}
                    {content}
                    {/* product card end */}
                </div>
                {/* paginatin start */}
                <Pagination />
                {/* paginatin end */}
            </div>
        </div>
    );
}

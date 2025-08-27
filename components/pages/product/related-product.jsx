import { products } from "@/data/site";
import ProductCard from "./ui/product-card";

export default function RelatedProduct() {
    return (
        <div className="related-product-section padding-bottom-140 ">
            <div className="container">
                <h3 className="related-product__title heading-md text-center mb-res-60">
                    Related products
                </h3>
                <div className="row  gutter-y-default">
                    {/* related product start */}
                    {products?.map((item, i) => (
                        <div
                            key={i}
                            className="col-lg-3 col-md-4 col-xs-6"
                            data-aos-duration={1000}
                            data-aos="fade-left"
                            data-aos-delay
                        >
                            <ProductCard data={item} />
                        </div>
                    ))}
                    {/* related product end */}
                </div>
            </div>
        </div>
    );
}

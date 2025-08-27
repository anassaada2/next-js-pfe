import ProductDetail from "./ui/product-detail";
import ProductGallery from "./ui/product-gallery";
import ProductTab from "./ui/product-tab";

export default function ProductInfo() {
    return (
        <div className="product-details section-padding-140 ">
            <div className="container">
                <div className="row gutter-y-40">
                    <div className="col-lg-6">
                        <ProductGallery />
                    </div>
                    <div className="offset-lg-1 col-lg-5">
                        <ProductDetail />
                    </div>
                </div>
                <ProductTab />
            </div>
        </div>
    );
}

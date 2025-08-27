"use client";
import CartTotal from "./ui/cart-total";
import ProductCartItem from "./ui/product-cart-item";
import { useSelector } from "react-redux";

export default function CartArea() {
    const { products } = useSelector((state) => state.product);

    // product items
    let content;

    if (products.length === 0) {
        content = <p className="py-4 text-center">Data not found</p>;
    }

    if (products.length > 0) {
        content = products?.map((item, i) => (
            <ProductCartItem key={i} data={item} />
        ));
    }

    return (
        <div className="cart-section">
            <div className="container">
                <div className="section-padding">
                    <div className="cart-table">
                        <div className="cart-table__head">
                            <div>
                                <h3>Products</h3>
                            </div>
                            <div>
                                <h3>Price</h3>
                            </div>
                            <div>
                                <h3>Quantity</h3>
                            </div>
                            <div>
                                <h3>Subtotal</h3>
                            </div>
                        </div>
                        <div className="cart-table__body">
                            {/* cart items start */}
                            {content}
                            {/* cart items end */}
                        </div>
                    </div>
                    <div className="cart-coupon-block">
                        <form className="coupon-form">
                            <input type="text" placeholder="Coupon code" />
                            <button className="btn btn-link btn-arrow btn-white btn-coupon"></button>
                        </form>
                        <button className="btn btn-primary hvr-fill-black">
                            update cart
                        </button>
                    </div>
                    <CartTotal />
                </div>
            </div>
        </div>
    );
}

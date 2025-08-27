"use client";
import priceCalculation from "@/lib/price-calculation";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Order() {
    const { products } = useSelector((state) => state.product);

    return (
        <>
            <h3 className="checkout-title heading-sm mb-32">Your order</h3>
            <div className="order-block">
                <ul className="order-item">
                    <li className="order-item-details">
                        <span>Product</span>
                        <span>Subtotal</span>
                    </li>
                    {/* product item list start */}
                    {products?.map((item, i) => (
                        <li key={i} className="order-item-single">
                            <span>
                                {item.title} x{item.qty}
                            </span>
                            <span>${(item.price * item.qty).toFixed(2)}</span>
                        </li>
                    ))}
                    {/* product item list end */}
                    <li className="order-item-total">
                        <span>Total</span>
                        <span>${priceCalculation(products).toFixed(2)}</span>
                    </li>
                </ul>
                <div className="order-bottom-block">
                    <form action="/">
                        <input
                            type="radio"
                            id="cart-select"
                            name="fav_language"
                            defaultValue="Cash on delivery"
                        />
                        <label htmlFor="cart-select">Cash on delivery</label>
                    </form>
                    <h4>Pay with cash upon delivery.</h4>
                    <p>
                        Your personal data will be used to process your order,
                        support your experience throughout this website, and for
                        other purposes described in our
                        <Link href="/">privacy policy.</Link>
                    </p>
                    <Link
                        href="/order"
                        className="btn btn-primary hvr-fill-black"
                    >
                        place order
                        <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                    </Link>
                </div>
            </div>
        </>
    );
}

"use client";

import priceCalculation from "@/lib/price-calculation";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function CartTotal() {
    const { products } = useSelector((state) => state.product);

    return (
        <div className="cart-total-block">
            <h3>Cart totals</h3>
            <div className="cart-total-item">
                <p>Subtotal</p>
                <span>${priceCalculation(products).toFixed(2)}</span>
            </div>
            <div className="cart-total-item">
                <p>Total</p>
                <span>${priceCalculation(products).toFixed(2)}</span>
            </div>
            <div className="cart-total-checkout-btn">
                <Link
                    href="/checkout"
                    className="btn btn-primary hvr-fill-black"
                >
                    Proceed to checkout
                    <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                </Link>
            </div>
        </div>
    );
}

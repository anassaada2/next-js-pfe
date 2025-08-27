"use client";
import Image from "next/image";
import CartList from "./cart-list";
import { useSelector } from "react-redux";

export default function Cart() {
    // product state
    const { products } = useSelector((state) => state.product);

    // total quantity calculation
    let total = 0;

    products.forEach((item) => {
        total += item.qty;
    });

    return (
        <div className="menu-link-item has-children">
            <div className="menu-btn">
                <Image
                    height={24}
                    width={24}
                    src="/image/icons/shopping-bag.svg"
                    alt="icon"
                />
                &nbsp; Cart ({total})
            </div>
            <CartList />
        </div>
    );
}

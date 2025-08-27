import Image from "next/image";
import CartList from "./cart-list";

export default function Card2() {
    return (
        <div className="menu-link-item has-children">
            <div className="menu-btn">
                <Image
                    height={22}
                    width={22}
                    src="/image/icons/shopping-bag.svg"
                    alt="icon"
                />
            </div>
            <CartList />
        </div>
    );
}

"use client";
import priceCalculation from "@/lib/price-calculation";
import { removeProduct } from "@/redux/features/products/productSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CartList() {
    // product state
    const { products } = useSelector((state) => state.product);

    const dispath = useDispatch();

    // remove cart handler
    const removeCartHandler = (i) => {
        dispath(removeProduct(i));
        toast.error("Product removed from cart");
    };

    return (
        <div className="sub-cart-menu">
            <div className="sub-cart-menu-wrapper">
                <div className="cart-menu_item-wrapper">
                    {/* product items start */}
                    {products?.map((item, i) => (
                        <div key={i} className="cart-menu_item">
                            <div className="cart-menu_item-info">
                                <div className="cart-menu_item-info-image">
                                    <Image
                                        height={80}
                                        width={80}
                                        src={item.img}
                                        alt="product"
                                    />
                                </div>
                                <div>
                                    <h4 className="cart-title">{item.title}</h4>
                                    <p className="cart-price">
                                        ${item.price.toFixed(2)}
                                    </p>
                                    <p className="cart-quantity">x{item.qty}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeCartHandler(item.id)}
                                className="close-btn"
                            >
                                <svg
                                    width={14}
                                    height={14}
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.86536 13.4166L0.582031 12.1333L5.71536 6.99998L0.582031 1.86665L1.86536 0.583313L6.9987 5.71665L12.132 0.583313L13.4154 1.86665L8.28203 6.99998L13.4154 12.1333L12.132 13.4166L6.9987 8.28331L1.86536 13.4166Z"
                                        fill="#959595"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                    {/* product items end */}
                </div>
                <div className="cart-menu_item-total">
                    <div className="amount">
                        <p>Total</p>
                        <p>${priceCalculation(products).toFixed(2)}</p>
                    </div>
                    <Link
                        href="/cart"
                        className="btn btn-primary hvr-fill-black"
                    >
                        View Cart &amp; Checkout
                        <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

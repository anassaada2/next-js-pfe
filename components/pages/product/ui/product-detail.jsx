"use client";
import { addProduct } from "@/redux/features/products/productSlice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProductDetail() {
    const [qty, setQty] = useState(1);
    const { products } = useSelector((state) => state.product);

    // increment qty handler
    const incHandler = () => {
        setQty(qty + 1);
    };

    const decHandler = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    };

    // decrement qty handler
    const dispatch = useDispatch();

    // add to cart
    const addToCartHandler = () => {
        const item = {
            id: 1,
            img: "/image/product/product-image-1.png",
            title: "Wooden drawer",
            price: 420,
            qty,
        };
        dispatch(addProduct(item));
        toast.success("Product added to cart");
    };

    // is first item selected
    const isSelected = products?.find((item) => item.id === 1);

    return (
        <div className="product-details__text-block">
            <span className="product-details__price ">$420.00</span>
            <h2 className="product-details__title heading-md">Wooden drawer</h2>
            <div className="product-details__rating-block">
                <Image
                    height={22}
                    width={126}
                    src="/image/icons/icon-star.svg"
                    alt="star"
                />
                <span>(2 Customer Reviews)</span>
            </div>
            <p>
                Lorem ipsum dolor, consectetur adipiscing Suspendisse varius
                enim in eros elementum tristique. Duis cursus, mi viverra
                ornare, eros dolor interdum
            </p>
            <div className="product-details__button-group mb-res-60">
                <div className="quantity-block-02">
                    <div className="quantity-02">
                        <button
                            disabled={!!isSelected}
                            onClick={decHandler}
                            className="decrement-btn"
                        >
                            <i className="fa-solid fa-minus" />
                        </button>
                        <p className="quantity-value">{qty}</p>
                        <button
                            disabled={!!isSelected}
                            onClick={incHandler}
                            className="increment-btn"
                        >
                            <i className="fa-solid fa-plus" />
                        </button>
                    </div>
                </div>
                <a
                    onClick={!!isSelected ? null : addToCartHandler}
                    className="btn btn-primary hvr-fill-black"
                >
                    {!!isSelected ? "Added cart" : "add to cart"}
                    <Image
                        height={20}
                        width={16}
                        src="/image/icons/icon-shopping-bag.svg"
                        alt="shopping bag"
                    />
                </a>
            </div>
            <ul className="product-details__specification">
                <li>
                    <span>SKU:</span> 008
                </li>
                <li>
                    <span>Categories:</span> Design, Interior
                </li>
                <li>
                    <span>Tags:</span> Art, Furniture, Print
                </li>
            </ul>
            <div className="social-list-widget">
                <Link href="/">
                    <img src="/image/icons/facebook.svg" alt="social-icon" />
                </Link>
                <Link href="/">
                    <img src="/image/icons/twitter.svg" alt="social-icon" />
                </Link>
                <Link href="/">
                    <img src="/image/icons/linkedin.svg" alt="social-icon" />
                </Link>
            </div>
        </div>
    );
}

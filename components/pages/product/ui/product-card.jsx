"use client";
import { addProduct } from "@/redux/features/products/productSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function ProductCard({ data }) {
    const dispatch = useDispatch();

    // add to cart
    const addToCartHandler = (item) => {
        dispatch(addProduct(item));
        toast.success("Product added to cart");
    };

    return (
        <div className="product-card h-100">
            <div className="product-card__image">
                <Link href="/product-details" className="d-block">
                    <Image
                        height={341}
                        width={347}
                        src={data.img}
                        alt="image alt"
                    />
                </Link>
                <div className="product-card__hover-block  absolute-center">
                    <span onClick={() => addToCartHandler(data)}>
                        <a className="product-card__cart-button">
                            <Image
                                height={19}
                                width={15}
                                src="/image/icons/icon-shopping-bag.svg"
                                alt="shopping bag"
                            />
                        </a>
                    </span>
                </div>
            </div>
            <div className="product-card__body">
                <Link href="/product-details">
                    <h3 className="product-card__title ">{data.title}</h3>
                </Link>
                <h6 className="product-card__price">
                    ${data.price.toFixed(2)}
                </h6>
            </div>
        </div>
    );
}

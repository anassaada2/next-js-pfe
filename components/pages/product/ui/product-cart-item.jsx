"use client";
import {
    decProduct,
    incProduct,
    removeProduct,
} from "@/redux/features/products/productSlice";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function ProductCartItem({ data }) {
    const [qty, setQty] = useState(data.qty);

    const dispath = useDispatch();

    // increment handler
    const incHandler = () => {
        setQty((prev) => prev + 1);
        dispath(incProduct(data.id));
    };

    // decrement handler
    const decHandler = () => {
        if (qty > 1) {
            setQty((prev) => prev - 1);
            dispath(decProduct(data.id));
            return;
        }

        toast.error("Minimum quantity is 1");
    };

    // remove cart handler
    const removeCartHandler = () => {
        dispath(removeProduct(data.id));
        toast.error("Product removed from cart");
    };

    return (
        <div className="item-block">
            <div className="content-block">
                <button onClick={removeCartHandler}>
                    <i className="fa-solid fa-xmark" />
                </button>
                <div className="content-media">
                    <Image
                        height={110}
                        width={110}
                        src={data.img}
                        alt="item image"
                    />
                    <h3>{data.title}</h3>
                </div>
            </div>
            <div className="price-block">
                <p>${data.price.toFixed(2)}</p>
            </div>
            <div className="quantity-block">
                <div className="quantity">
                    <button onClick={decHandler} className="decrement-btn">
                        <i className="fa-solid fa-minus" />
                    </button>
                    <p className="quantity-value">{qty}</p>
                    <button onClick={incHandler} className="increment-btn">
                        <i className="fa-solid fa-plus" />
                    </button>
                </div>
            </div>
            <div className="total-block">
                <p>${(qty * data.price).toFixed(2)}</p>
            </div>
        </div>
    );
}

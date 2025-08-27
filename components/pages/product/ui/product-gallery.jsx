"use client";
import Image from "next/image";
import { useState } from "react";
import Slider from "react-slick";

const data = [
    "/image/product/product-details-large-2.png",
    "/image/product/product-image-1.png",
    "/image/product/product-details-large-3.png",
];

export default function ProductGallery() {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    return (
        <div className="product-details__image">
            <div className="product-image-main">
                <Slider
                    asNavFor={nav2}
                    ref={(slider) => setNav1(slider)}
                    slidesToShow={1}
                    fade={true}
                    infinite={false}
                >
                    {data?.map((item, i) => (
                        <Image
                            height={543}
                            width={546}
                            key={i}
                            src={item}
                            alt="thumbnail"
                            className="h-auto"
                        />
                    ))}
                </Slider>
            </div>
            <div className="product-image-thumbnail slider-gutter-16">
                <Slider
                    asNavFor={nav1}
                    ref={(slider) => setNav2(slider)}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    infinite={false}
                >
                    {data?.map((item, i) => (
                        <Image
                            height={172}
                            width={172}
                            key={i}
                            src={item}
                            alt="thumbnail"
                            className="h-auto"
                        />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

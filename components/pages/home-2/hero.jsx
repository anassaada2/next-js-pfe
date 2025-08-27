"use client";
import Slider from "react-slick";
import { useState } from "react";
import HeroBanner from "./ui/hero-banner";
import { heroBanner2 } from "@/data/site";

const nav = [
    "01. Home Renovation",
    "02. Home Renovation",
    "03. Home Renovation",
];

export default function Hero() {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    // slider 1 settings
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
    };

    // slider 2 settings
    const settings2 = {
        slidesToShow: 3,
        swipeToSlide: true,
        focusOnSelect: true,
    };

    return (
        <div className="hero-section-02">
            <div className="hero-fluid-slider">
                <Slider
                    {...settings}
                    ref={(slider) => setNav1(slider)}
                    asNavFor={nav2}
                >
                    {heroBanner2?.map((item, i) => (
                        <div key={i} className="hero-fluid-slider">
                            <HeroBanner data={item} />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="hero-fluid-slider-navigation">
                <Slider
                    {...settings2}
                    asNavFor={nav1}
                    ref={(slider) => setNav2(slider)}
                >
                    {nav?.map((item, i) => (
                        <div key={i} className="single-nav">
                            <span>{item}</span>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

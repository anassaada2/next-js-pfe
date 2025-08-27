"use client";
import Slider from "react-slick";
import ServiceCard from "../../ui/cards/service-card";
import { service3 } from "@/data/site";
import { slice } from "@/public/fonts/fontawesome/js/v4-shims";

export default function Service() {
    // service options
    const options = {
        arrows: false,
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="blog-section section-padding bg-sand">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xxl-6">
                        <div className="section-heading text-center">
                            <span className="subtitle">Our services</span>
                            <h2 className="section-heading__title">
                                Creating commercial &amp; residential
                                architecture
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="four-column-slider slider-gutter-30 slider-dots slide-equal-height">
                    {/* service slider card start */}
                    <Slider {...options}>
                        {service3?.slice(0, 6).map((item, i) => (
                            <div key={i} className="single-slide">
                                <ServiceCard data={item} />
                            </div>
                        ))}
                    </Slider>
                    {/* service slider emd start */}
                </div>
            </div>
        </div>
    );
}

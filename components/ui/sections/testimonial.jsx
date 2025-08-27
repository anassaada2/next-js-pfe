"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { testimonials } from "@/data/site";
import TestimonialCard from "../../pages/home-1/ui/testimonial-card";

export default function Testimonial() {
  return (
    <div
      className="testimonial-section-01 overlay bg-fixed section-padding-140"
      style={{
        backgroundImage: 'url("image/AFEC/logo.png")',
      }}
    >
      <div className="container">
        <div className="testimonial-01__slider-wrapper">
          <p className="mot-presidant"> Mot Du Présidant </p>
          <div className="testimonial-01__slider">
            {testimonials?.map((item, i) => (
              <TestimonialCard data={item} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import ArticleCard from "../../ui/cards/article-card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { blogs } from "@/data/site";

export default function Article() {
  return (
    <div className="blog-section bg-sand">
      <div className="container">
        <div className=" section-padding border-bottom">
          <div className="section-heading text-center">
            <span className="subtitle">Latest Projects</span>
            <h2 className="section-heading__title">Our recent projects</h2>
          </div>
          <div>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              pagination={{
                clickable: true,
                bulletClass: "ui-custom-dot",
              }}
              modules={[Pagination]}
              className="ui-swipper-wrapper"
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                576: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
              }}
            >
              {blogs?.slice(0, 3).map((item, i) => (
                <SwiperSlide key={i}>
                  <ArticleCard data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

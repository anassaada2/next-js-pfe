import Video from "@/components/ui/sections/video";
import Image from "next/image";
import Link from "next/link";

const images = [
    "/image/portfolio/portfolio-1.png",
    "/image/portfolio/portfolio-2.png",
    "/image/portfolio/portfolio-3.png",
    "/image/portfolio/portfolio-4.png",
];

export default function PortfolioDetail() {
    return (
        <div className="portfolio-details_main-section section-padding-140 single-page-content">
            <div className="container">
                <div className="row justify-content-center ">
                    <div className="col-12">
                        <div className="portfolio-details_main-image">
                            <Image
                                height={606}
                                width={1116}
                                src="/image/portfolio/portfolio-details-1.png"
                                alt="portfolio main thumbnail"
                                className="mb-res-60 w-100 h-auto"
                            />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="portfolio-details_main-single mb-res-80">
                            <div className="portfolio-details_facts-block border-bottom ">
                                <div className="single-facts">
                                    <h4 className="single-facts__title">
                                        Year
                                    </h4>
                                    <span>July 2020</span>
                                </div>
                                <div className="single-facts">
                                    <h4 className="single-facts__title">
                                        Client
                                    </h4>
                                    <span>Private residence</span>
                                </div>
                                <div className="single-facts">
                                    <h4 className="single-facts__title">
                                        Service:
                                    </h4>
                                    <span>Building, Residence</span>
                                </div>
                                <div className="single-facts">
                                    <h4 className="single-facts__title">
                                        Location:
                                    </h4>
                                    <span>Bali, Indonesia</span>
                                </div>
                            </div>
                            <h3>Designing with balance and care</h3>
                            <p>
                                Risus rhoncus, vel erat rhoncus, consequat ut
                                aliquet. Tortor semper sed proin augue laoreet
                                placerat. Vestibulum sit fames arcu ut justo
                                accumsan eget. Rhoncus dictumst magna ornare
                                eleifend egestas in faucibus nascetur arcu.
                                Nulla maecenas massa lectus tortor urna ipsum
                                diam ultrices commodo. Metus eget nulla sit
                                consectetur egestas velit. Eu, morbi suspendisse
                                massa nec, neque ac dui. Vel, tortor mattis ut
                                ornare elit
                            </p>
                            <p>
                                At Konstruktion, we are passionate about driving
                                value into every project we undertake. We
                                continue to challenge our people, projects and
                                the industry. By being forward-thinking , we are
                                continually finding new ways to deliver success
                                for our clients and stakeholders.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="row portfolio-details_main-image-row mb-res-80 gutter-y-default">
                            {/* 4 image start */}
                            {images?.map((item, i) => (
                                <div key={i} className="col-6">
                                    <Image
                                        height={345}
                                        width={546}
                                        src={item}
                                        alt="portfolio image"
                                        className="w-100 h-auto"
                                    />
                                </div>
                            ))}
                            {/* 4 image end */}
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="portfolio-details_main-single mb-res-80">
                            <h3>The final design</h3>
                            <p>
                                Risus rhoncus, vel erat rhoncus, consequat ut
                                aliquet. Tortor semper sed proin augue placerat.
                                Vestibulum sit fames arcu ut justo accumsan
                                eget. Rhoncus dictumst magna ornare egestas in
                                faucibus nascetur arcu. Nulla maecenas massa
                                lectus
                            </p>
                            <p>
                                Senectus natoque duis consequat varius pulvinar
                                eleifend. Diam ullamcorper sit commodo tempor id
                                tempor massa. Nibh fringilla dictum duis sed
                                odio. Faucibus vitae leo vitae mauris enim velit
                                id at. Penatibus nibh adipiscing dui sit.
                                Vestibulum gravida nisl nisl egestas gravida
                                euismod. Tempor urna facilisis turpis senectus.
                                Nullam aliquet eros, proin in. In cursus
                            </p>
                        </div>
                    </div>
                    {/* video lightbox start */}
                    <div className="col-12">
                        <Video />
                    </div>
                    {/* video lightbox end */}
                    <div className="col-lg-8">
                        <p>
                            Senectus natoque duis consequat varius pulvinar
                            eleifend. Diam ullamcorper sit commodo tempor id
                            tempor massa. Nibh fringilla dictum duis sed odio.
                            Faucibus vitae leo vitae mauris enim velit id at.
                            Penatibus nibh adipiscing dui sit. Vestibulum
                            gravida nisl nisl egestas gravida euismod. Tempor
                            urna facilisis turpis senectus. Nullam aliquet eros,
                            proin in. In cursus
                        </p>
                        <Link
                            href="/contact"
                            className="btn btn-primary mt-20 hvr-fill-black"
                        >
                            visit website
                            <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

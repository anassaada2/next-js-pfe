import Link from "next/link";

export default function HeroBanner({ data }) {
    return (
        <div
            className="hero-slide-single bg-image overlay-07"
            style={{
                backgroundImage: `url(${data.background})`,
            }}
        >
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div
                        className="col-xxl-10 col-md-9"
                        data-aos-duration={1000}
                        data-aos="fade-up"
                        data-aos-delay={300}
                    >
                        <div className="hero-content">
                            <div className="hero-content_text-block">
                                <h1 className="hero-content__title heading-xxl text-sand">
                                    {data.title}
                                </h1>
                                <p>{data.description}</p>
                            </div>
                            <div className="hero-content_button-group">
                                <Link
                                    href="/contact"
                                    className="btn btn-primary hvr-fill-black"
                                >
                                    Get in touch
                                    <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                                </Link>
                                <Link
                                    href="/home-2"
                                    className="btn btn-white hvr-white-primary"
                                >
                                    our works
                                    <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

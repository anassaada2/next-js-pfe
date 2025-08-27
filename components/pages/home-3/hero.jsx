import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="hero-section-03">
            <div className="hero-section-03_wrapper">
                <div className="container ">
                    <div className="row gutter-y-40 flex-lg-row-reverse justify-content-center align-items-center ">
                        <div className="offset-xl-1 col-xl-5 col-lg-6 col-md-7 col-sm-8 col-9">
                            <div className="hero-content-03_image-3">
                                <Image
                                    height={1004}
                                    width={580}
                                    src="/image/hero/hero-image-3.png"
                                    alt="hero"
                                    className="object-image"
                                />
                            </div>
                        </div>
                        <div
                            className="col-xl-6 col-lg-6 col-md-8 col-sm-9 col-xs-10"
                            data-aos-duration={1000}
                            data-aos="fade-up"
                            data-aos-delay={300}
                        >
                            <div className="hero-content-03">
                                <div className="hero-content-03_text-block">
                                    <h1 className="hero-content-03__title heading-xl text-black">
                                        Creating architecture that reflects your
                                        vision
                                    </h1>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Suspendisse varius enim
                                        in eros elementum tristique. Duis
                                        cursus, mi quis
                                    </p>
                                </div>
                                <div className="hero-content-03_button-group">
                                    <Link
                                        href="/contact"
                                        className="btn btn-primary hvr-fill-black"
                                    >
                                        Get in touch
                                        <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                                    </Link>
                                    <Link
                                        href="/portfolio-details"
                                        className="btn btn-black hvr-black-primary"
                                    >
                                        our works
                                        <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                                    </Link>
                                </div>
                            </div>
                            <div className="hero-contact-widgets">
                                <div className="contact-widget">
                                    <h3 className="contact-widget__title">
                                        Call Us
                                    </h3>
                                    <span className="contact-widget__text">
                                        +123 456789
                                    </span>
                                </div>
                                <div className="contact-widget">
                                    <h3 className="contact-widget__title">
                                        Email Us:
                                    </h3>
                                    <span className="contact-widget__text">
                                        admin@arcatec.com
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

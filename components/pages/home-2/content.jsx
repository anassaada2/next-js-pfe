import Image from "next/image";

export default function Content() {
    return (
        <div className="content-section-02 padding-top-140">
            <div className="container">
                <div className="row align-items-center flex-lg-row-reverse gutter-y-40 gutter-x-50 justify-content-center justify-content-lg-between">
                    <div
                        className=" offset-xxl-1 col-lg-5 col-md-6 col-sm-7 col-8"
                        data-aos-duration={1000}
                        data-aos="fade-left"
                    >
                        <div className="content-image-02">
                            <Image
                                height={477}
                                width={436}
                                src="/image/home-2/content-image.png"
                                alt="content image"
                                className="w-100 h-auto"
                            />
                        </div>
                    </div>
                    <div
                        className="col-xxl-6 col-lg-7 col-md-8 col-sm-11"
                        data-aos-duration={1000}
                        data-aos="fade-right"
                    >
                        <div className="content-text-block-02-wrapper">
                            <div className="content-text-block-02">
                                <span className="subtitle">
                                    Trusted experience
                                </span>
                                <h2 className="content-title heading-md text-black mb-32">
                                    Creating commercial &amp; residential
                                    architecture
                                </h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Suspendisse varius enim in
                                    eros elementum tristique. Duis cursus, mi
                                    quis viverra ornare, eros dolor interdum
                                    nulla, ut commodo
                                </p>
                            </div>
                            <div className="content-list-block">
                                <ul className="content-list">
                                    <li className="content-list-item">
                                        Structural Design
                                    </li>
                                    <li className="content-list-item">
                                        Residential Space
                                    </li>
                                    <li className="content-list-item">
                                        Interior Design
                                    </li>
                                    <li className="content-list-item">
                                        Functional Kitchens
                                    </li>
                                </ul>
                                <ul className="content-list">
                                    <li className="content-list-item">
                                        Landscape Architecture
                                    </li>
                                    <li className="content-list-item">
                                        Site Panning
                                    </li>
                                    <li className="content-list-item">
                                        Project Analysis
                                    </li>
                                    <li className="content-list-item">
                                        construction Plan
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

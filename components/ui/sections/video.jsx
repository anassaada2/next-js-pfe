"use client";
import { useState } from "react";
import FsLightbox from "fslightbox-react";
import Image from "next/image";

export default function Video() {
    const [toggler, setToggler] = useState(false);

    return (
        <div className="video-section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="hero-video-block position-relative">
                        <Image
                            height={675}
                            width={1349}
                            src="/image/video/video-image.png"
                            alt="video"
                            className="w-100 h-auto"
                        />
                        <a
                            onClick={() => setToggler(!toggler)}
                            className="btn-play sonar-emitter absolute-center btn-play "
                        >
                            <i className="fa-solid fa-play" />
                        </a>
                    </div>
                    <FsLightbox
                        toggler={toggler}
                        sources={[
                            "https://www.youtube.com/watch?v=zo9dJFo8H8g",
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

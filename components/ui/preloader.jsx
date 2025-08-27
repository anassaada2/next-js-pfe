"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Preloader() {
    const path = usePathname();
    const preloaderRef = useRef(null);

    // preloader effect

    useEffect(() => {
        if (typeof window !== "undefined") {
            const body = document.getElementsByTagName("body")[0];
            preloaderRef.current.style.display = "block";
            body.classList.add("loading");
            body.classList.remove("loaded");

            setTimeout(() => {
                body.classList.remove("loading");
                body.classList.add("loaded");
            }, 700);

            setTimeout(() => {
                preloaderRef.current.style.display = "none";
            }, 1500);
        }
    }, [path]);

    return (
        <>
            <div ref={preloaderRef} className="preloader-wrapp">
                <span className="bar" />
                <span className="bar" />
                <span className="bar" />
            </div>
        </>
    );
}

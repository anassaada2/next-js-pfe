"use client";

import { useEffect, useState } from "react";

export default function useSticky(topOffset = 100) {
    const [isSticky, setSticky] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stickyHandler = () => {
                window.scrollY > topOffset ? setSticky(true) : setSticky(false);
            };
            window.addEventListener("scroll", stickyHandler);
            return () => {
                window.removeEventListener("scroll", stickyHandler);
            };
        }
    }, []);

    return isSticky;
}

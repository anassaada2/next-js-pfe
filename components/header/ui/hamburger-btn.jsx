"use client";

import { toggleSidebar } from "@/redux/features/toggles/toggleSlice";
import { useDispatch, useSelector } from "react-redux";

export default function HamburgerBtn() {
    const { isSidebarActive } = useSelector((state) => state.toggle);
    const dispath = useDispatch();

    // toggle handler
    const toggleHandler = () => {
        dispath(toggleSidebar());
    };

    return (
        <div
            onClick={toggleHandler}
            className={`mobile-menu-trigger ${isSidebarActive ? "active" : ""}`}
        >
            <span />
        </div>
    );
}

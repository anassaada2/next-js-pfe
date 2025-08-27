"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
if (typeof window !== "undefined") {
    require("bootstrap");
}
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarNavigation from "@/components/header/sidebar-navigation";
import Preloader from "@/components/ui/preloader";

export default function Providers({ children }) {
    // AOS init
    useEffect(() => {
        if (typeof window !== "undefined") {
            AOS.init({
                once: true,
                duration: 1000,
                disable: function () {
                    var maxWidth = 991;
                    return window.innerWidth < maxWidth;
                },
            });
            AOS.refresh();
        }
    }, []);

    return (
        <>
            <Provider store={store}>
                {/* preloader */}
                <Preloader />
                {children}
                {/* toastify initialize  */}
                <ToastContainer
                    theme="light"
                    autoClose={800}
                    position="top-center"
                    hideProgressBar={true}
                />
                {/* sidebar navigation */}
                <SidebarNavigation />
            </Provider>
        </>
    );
}

"use client";
import { useState } from "react";
import ProjectCard from "@/components/ui/cards/project-card";
import { projectTabs, projects } from "@/data/site";
import { AnimatePresence, motion } from "framer-motion";

export default function Project() {
    const [getCurrentTab, setCurrentTab] = useState("Show All");

    return (
        <div className="project-section section-padding">
            <div className="container-fluid portfolio-container">
                <ul className="navigation-list navigation-list--inline divider-navigation-inline justify-content-center mb-res-60">
                    {projectTabs?.map((item, i) => (
                        <li key={i}>
                            <button
                                onClick={() => {
                                    setCurrentTab(item);
                                }}
                                className={`btn-reset ${
                                    getCurrentTab === item ? "active" : ""
                                }`}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* project cards start */}
                <div className="row grid navigation-active isotope-navigation portfolio-v1 gutter-y-default">
                    <AnimatePresence>
                        {projects
                            ?.filter((item) => {
                                if (getCurrentTab === "Show All") {
                                    return item;
                                } else {
                                    return item.filter.includes(getCurrentTab);
                                }
                            })
                            .map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="col-lg-4 col-md-6 col-sm-11"
                                    layout
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                >
                                    <ProjectCard data={item} />
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </div>
                {/* project cards end */}
            </div>
        </div>
    );
}

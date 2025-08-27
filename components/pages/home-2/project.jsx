"use client";
import { projectTabs, projects } from "@/data/site";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "@/components/ui/cards/project-card";

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
                <div className="portfolio-v2 masonry-grid">
                    <AnimatePresence>
                        {projects
                            ?.filter((item) => {
                                if (getCurrentTab === "Show All") {
                                    return item;
                                } else {
                                    return item.filter.includes(getCurrentTab);
                                }
                            })
                            .slice(0, 5)
                            .map((item, i) => (
                                <motion.div
                                    key={i}
                                    className={`grid-item ${
                                        i == 1 ? "grid-item-big" : ""
                                    }`}
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
            </div>
        </div>
    );
}

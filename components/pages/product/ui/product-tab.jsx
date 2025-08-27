"use client";
import { useState } from "react";

const tabs = ["Description", "Additional information", "Reviews (2)"];

export default function ProductTab() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <div className="row padding-top-140">
                <div className="col-xl-5 col-lg-6">
                    <ul className="tab__nav nav nav-pills">
                        {/* tabs start */}
                        {tabs?.map((item, i) => (
                            <li key={i} className="nav-item">
                                <button
                                    onClick={() => setActiveTab(i)}
                                    className={`nav-link ${
                                        activeTab === i ? "active" : ""
                                    }`}
                                    type="button"
                                >
                                    <span>{item}</span>
                                </button>
                            </li>
                        ))}
                        {/* tabs end */}
                    </ul>
                </div>
            </div>
            <div className="tab-content">
                <div
                    className={`tab-pane ${
                        activeTab === 0 ? "show active" : ""
                    }`}
                >
                    <p>
                        In a professional context it often happens that private
                        or corporate clients corder a publication to be made and
                        presented with the actual content still not being ready.
                        Think of a news blog that’s filled with content hourly
                        on the day of going live. However, reviewers tend to be
                        distracted by comprehensible content, say, a random text
                        copied from a newspaper or the internet.
                    </p>
                </div>
                <div
                    className={`tab-pane ${
                        activeTab === 1 ? "show active" : ""
                    }`}
                >
                    <p>
                        context it often happens that private or corporate
                        clients corder a publication to be made and presented
                        with the actual content still not being ready. Think of
                        a news blog that’s filled with content hourly on the day
                        of going live. However, reviewers tend to be distracted
                        by comprehensible content, say, a random text copied
                        from a newspaper or the internet.
                    </p>
                </div>
                <div
                    className={`tab-pane ${
                        activeTab === 2 ? "show active" : ""
                    }`}
                >
                    <p>
                        a professional context it often happens that private or
                        corporate clients corder a publication to be made and
                        presented with the actual content still not being ready.
                        Think of a news blog that’s filled with content hourly
                        on the day of going live. However, reviewers tend to be
                        distracted by comprehensible content, say, a random text
                        copied from a newspaper or the internet.
                    </p>
                </div>
            </div>
        </>
    );
}

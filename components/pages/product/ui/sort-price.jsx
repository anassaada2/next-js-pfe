"use client";
import { useState } from "react";

const items = [
    "Default Sorting",
    "A-Z",
    "a-z",
    "Sort By Latest",
    "Sort By Price",
];

export default function SortPrice() {
    const [isActive, setIsActive] = useState(false);
    const [selectedItem, setSelectedItem] = useState(0);

    // select handler
    const selectHandler = (i) => {
        setSelectedItem(i);
        setIsActive(false);
    };

    return (
        <div className="select-sort">
            <div className={`nice-select ${isActive ? "open" : ""}`}>
                <button
                    onClick={() => setIsActive(!isActive)}
                    className="current"
                >
                    {items[selectedItem]}{" "}
                    <i className="fa-solid fa-chevron-down" />
                </button>
                <ul className="list">
                    {/* options start */}
                    {items?.map((item, i) => (
                        <li
                            key={i}
                            onClick={() => selectHandler(i)}
                            className={`option ${
                                selectedItem == i ? "selected focus" : ""
                            }`}
                        >
                            {item}
                        </li>
                    ))}
                    {/* options end */}
                </ul>
            </div>
        </div>
    );
}

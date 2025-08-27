"use client";
import Select from "react-select";

export default function SelectTheme1({ data = [""] }) {
    return (
        <Select
            className="select-theme1"
            options={data}
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    padding: "0 1rem",
                    borderRadius: 0,
                    height: 56,
                    boxShadow: "none",
                    borderColor: "#ddd",
                    cursor: "pointer",
                }),
                option: (provided, state) => ({
                    ...provided,
                    color: state.isSelected ? "#222" : "#333",
                    backgroundColor: state.isSelected ? "#f6f6f6" : null,
                    padding: 10,
                    cursor: "pointer",
                    backgroundColor: state.isFocused ? "#f6f6f6" : null,
                }),
            }}
        />
    );
}

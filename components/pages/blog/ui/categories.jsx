const data = [
    {
        label: "Architecture",
        length: 18,
    },
    {
        label: "Furniture",
        length: 12,
    },
    {
        label: "Design",
        length: 5,
    },
    {
        label: "Interior",
        length: 14,
    },
    {
        label: "Infrastructure",
        length: 3,
    },
    {
        label: "Decoration",
        length: 9,
    },
];

export default function Categories() {
    return (
        <ul className="list-style-regular text-black">
            {/* category list start */}
            {data?.map((item, i) => (
                <li key={i}>
                    <a>
                        {item.label} ({item.length})
                    </a>
                </li>
            ))}
            {/* category list end */}
        </ul>
    );
}

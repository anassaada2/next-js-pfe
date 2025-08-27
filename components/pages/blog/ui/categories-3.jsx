const data = ["Accessories", "Art", "Decor", "Design", "Material", "Modern"];
export default function Categories2() {
    return (
        <ul className="divider-navigation-inline text-black fw-regular">
            {/* category list start */}
            {data?.map((item, i) => (
                <li key={i}>
                    <a>{item}</a>
                </li>
            ))}
            {/* category list end */}
        </ul>
    );
}

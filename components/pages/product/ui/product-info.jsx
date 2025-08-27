export default function ProductInfo({ totla }) {
    return (
        <p>
            Showing <span className="fw-500">1–12</span> of
            <span className="fw-500 ms-1">{totla}</span> results
        </p>
    );
}

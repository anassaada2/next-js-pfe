import Link from "next/link";

export default function Pagination() {
    return (
        <div className="pagination">
            <Link href="/" className="pagination-item active">
                1
            </Link>
            <Link href="/" className="pagination-item">
                2
            </Link>
            <Link href="/" className="pagination-item">
                3
            </Link>
        </div>
    );
}

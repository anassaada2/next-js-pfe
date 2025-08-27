"use client";
import styles from "./pagination.module.scss";
// components/dashboard/pagination/PaginationDash.jsx

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaginationDash({ totalPages, currentPage }) {
  const searchParams = useSearchParams();
  const currentQuery = new URLSearchParams(searchParams.toString());

  const createPageLink = (page) => {
    currentQuery.set("page", page);
    return `?${currentQuery.toString()}`;
  };

  return (
    <nav
      aria-label="User pagination"
      className="mt-4 d-flex justify-content-center"
    >
      <ul className="pagination">
        {/* Previous button */}
        <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
          <Link className="page-link" href={createPageLink(currentPage - 1)}>
            Previous
          </Link>
        </li>

        {/* Page numbers */}
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <Link className="page-link" href={createPageLink(page)}>
                {page}
              </Link>
            </li>
          );
        })}

        {/* Next button */}
        <li
          className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}
        >
          <Link className="page-link" href={createPageLink(currentPage + 1)}>
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}

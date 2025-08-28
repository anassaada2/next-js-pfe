"use client";

import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import styles from "@/components/dashboard/sidebar/sidebar.module.scss";

export default function LogoutButton() {
  return (
    <button
      className={styles.logout}
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
    >
      <MdLogout />
      <span className={styles.logoutText}>Logout</span>
    </button>
  );
}

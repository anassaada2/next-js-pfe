"use client";

import Link from "next/link";
import styles from "./menuLink.module.scss";
import { usePathname } from "next/navigation";

function MenuLink({ item }) {
  const pathname = usePathname();
  return (
    <Link
      href={item.path}
      className={`${styles.container} ${pathname === item.path && styles.active}`}
    >
      {item.icon}
      <span className={styles.anas}>   
 {item.title}
      </span>
  
    </Link>
  );
}

export default MenuLink;

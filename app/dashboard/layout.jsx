import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import styles from "@/components/dashboard/dashboard.module.scss";
import Navbar from "@/components/dashboard/navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;

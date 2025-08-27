"use client";
import navigation from "@/data/navigation";
import { isParentActive } from "@/lib/is-menu-active";
import { toggleSidebar } from "@/redux/features/toggles/toggleSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";

export default function SidebarNavigation() {
    const { isSidebarActive } = useSelector((state) => state.toggle);
    const dispatch = useDispatch();

    const path = usePathname();

    return (
        <div className={`sidebar-menu ${isSidebarActive ? "active" : ""}`}>
            <div className="sidebar-logo">
                <Link href="/" className="d-flex  align-items-center      "    >
                    <Image
                        height={50}
                        width={172}
                        src="/image/AFEC/logo.png"
                        alt="logo"
                    />
                    <span>AFEC</span>
                </Link>
            </div>
            <Sidebar>
                <Menu>
                    {navigation?.map((item, i) =>
                        item?.dropdown ? (
                            <SubMenu
                                key={i}
                                label={item.label}
                                className={
                                    isParentActive(item, path)
                                        ? "ui-nav-active2"
                                        : ""
                                }
                            >
                                {item?.dropdown?.map((item2, i2) =>
                                    item2?.dropdown ? (
                                        <SubMenu
                                            key={i2}
                                            label={item2.label}
                                            className={
                                                isParentActive(item2, path)
                                                    ? "ui-nav-active2"
                                                    : ""
                                            }
                                        >
                                            {item2?.dropdown?.map(
                                                (item3, i3) => (
                                                    <MenuItem
                                                        className={
                                                            item3.url === path
                                                                ? "ui-nav-active2"
                                                                : ""
                                                        }
                                                        key={i3}
                                                        component={
                                                            <Link
                                                                onClick={() =>
                                                                    dispatch(
                                                                        toggleSidebar()
                                                                    )
                                                                }
                                                                href={item3.url}
                                                            ></Link>
                                                        }
                                                    >
                                                        {item3.label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </SubMenu>
                                    ) : (
                                        <MenuItem
                                            key={i2}
                                            className={
                                                item2.url === path
                                                    ? "ui-nav-active2"
                                                    : ""
                                            }
                                            component={
                                                <Link
                                                    onClick={() =>
                                                        dispatch(
                                                            toggleSidebar()
                                                        )
                                                    }
                                                    href={item2.url}
                                                ></Link>
                                            }
                                        >
                                            {item2.label}
                                        </MenuItem>
                                    )
                                )}
                            </SubMenu>
                        ) : (
                            <MenuItem
                                className={
                                    path === item.url ? "ui-nav-active2" : ""
                                }
                                key={i}
                                component={
                                    <Link
                                        onClick={() =>
                                            dispatch(toggleSidebar())
                                        }
                                        href={item.url}
                                    ></Link>
                                }
                            >
                                {item.label}
                            </MenuItem>
                        )
                    )}
                </Menu>
            </Sidebar>
        </div>
    );
}

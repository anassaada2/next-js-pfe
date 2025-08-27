"use client";
import { useEffect, useState } from "react";
import navigation from "@/data/navigation";
import { isParentActive } from "@/lib/is-menu-active";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();
  const [dynamicSolutions, setDynamicSolutions] = useState([]);

  useEffect(() => {
    const fetchSolutions = async () => {
      const res = await fetch("/api/solutions");
      const data = await res.json();
      setDynamicSolutions(data);
    };

    fetchSolutions();
  }, []);

  // Ajouter dynamiquement les solutions à l'entrée "Solutions innovantes"
  const updatedNavigation = navigation.map((item) => {
    if (item.label.trim() === "Solutions & Réalisations") {
      return {
        ...item,
        dropdown: item.dropdown.map((sub) => {
          if (sub.label === "Solutions innovantes") {
            return {
              ...sub,
              dropdown: dynamicSolutions.map((sol) => ({
                label: sol.name,
                url: `/solutions/${sol._id}`,
              })),
            };
          }
          return sub;
        }),
      };
    }
    return item;
  });

  return (
    <ul className="site-menu-main">
      {updatedNavigation.map((item, i) => (
        <li key={i} className="nav-item nav-item-has-children">
          {!item.dropdown ? (
            <Link
              href={item.url}
              className={`nav-link-item drop-trigger ${
                path === item.url ? "ui-nav-active" : ""
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <>
              <a
                className={`nav-link-item drop-trigger ${
                  isParentActive(item, path) ? "ui-nav-active" : ""
                }`}
              >
                {item.label}
                {item.dropdown ? <i className="fas fa-angle-down" /> : null}
              </a>
              <div className="sub-menu" id="submenu-3">
                <ul className="sub-menu_list">
                  {item.dropdown?.map((item2, i2) =>
                    !item2.dropdown ? (
                      <li key={i2} className="sub-menu_item">
                        <Link href={item2.url}>
                          <span
                            className={`menu-item-text ${
                              item2.url === path ? "active" : ""
                            }`}
                          >
                            {item2.label}
                          </span>
                        </Link>
                      </li>
                    ) : (
                      <li
                        key={i2}
                        className="sub-menu_item nav-item-has-children child-item"
                      >
                        <a className="sub-menu__item-link">
                          <span
                            className={`menu-item-text ${
                              isParentActive(item2, path) ? "active" : ""
                            }`}
                          >
                            {item2.label}
                          </span>
                          <i className="fas fa-angle-right" />
                        </a>
                        <div className="sub-menu child-sub" id="submenu-22">
                          <ul className="sub-menu_list">
                            {item2.dropdown.map((item3, i3) => (
                              <li key={i3} className="sub-menu_item">
                                <Link href={item3.url}>
                                  <span
                                    className={`menu-item-text ${
                                      item3.url === path ? "active" : ""
                                    }`}
                                  >
                                    {item3.label}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

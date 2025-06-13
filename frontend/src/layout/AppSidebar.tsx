import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { useAppSelector } from "../redux/hooks";

import {
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  roles?: string[];
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean; roles?: string[]; }[];
};

const navItems: NavItem[] = [
  // Super admin menu
  {
    icon: <GridIcon />,
    name: "Global Metrics Dashboard",
    roles: ["SuperAdmin"],
    subItems: [
      { name: "Number of tenants", path: "/", pro: false },
      { name: "Total users, growth rates", path: "/", pro: false },
      { name: "System health metrics", path: "/", pro: false },
    ],
  },
  {
    icon: <GridIcon />,
    name: "Tenant Management",
    roles: ["SuperAdmin"],
    subItems: [
      { name: "View/add/edit tenants", path: "/", pro: false },
      { name: "View tenant usage statistics", path: "/", pro: false },
      { name: "Impersonate tenant Admins", path: "/", pro: false },
    ],
  },
  {
    icon: <GridIcon />,
    name: "Billing Overview",
    roles: ["SuperAdmin"],
    subItems: [
      { name: "Subscription plans across tenants", path: "/", pro: false },
      { name: "Payment history", path: "/", pro: false },
    ],
  },
  {
    icon: <GridIcon />,
    name: "System-Wide Logs & Audit Trails",
    roles: ["SuperAdmin"],
    subItems: [
      { name: "Security logs", path: "/", pro: false },
      { name: "Admin actions", path: "/", pro: false },
    ],
  },
  {
    icon: <GridIcon />,
    name: "Feature Flag Management",
    roles: ["SuperAdmin"],
    subItems: [
      { name: "Turn features on/off per tenant", path: "/", pro: false },
    ],
  },

  // Admin menu
  {
    icon: <GridIcon />,
    name: "Users Overview",
    roles: ["Admin"],
    subItems: [
      { name: "Total users in tenant", path: "/", pro: false },
      { name: "Data usage", path: "/", pro: false },
      { name: "Feature usage breakdown", path: "/", pro: false },
    ],
  },
  {
    icon: <GridIcon />,
    name: "User Managements",
    roles: ["Admin"],
    subItems: [
      { name: "Invite new users", path: "/", pro: false },
      { name: "View/edit roles", path: "/", pro: false },
      { name: "View user activity logs", path: "/", pro: false },
    ],
  },
  {
    icon: <GridIcon />,
    name: "Reports / Analytics",
    roles: ["Admin"],
    path: "/",
  },
  {
    icon: <UserCircleIcon />,
    name: "Settings Access",
    roles: ["Admin"],
    path: "/",
    subItems: [
      { name: "Branding configuration", path: "/", pro: false },
      { name: "Notification preferences", path: "/", pro: false },
      { name: "API keys", path: "/", pro: false },
    ],
  },

  // Users menu
  {
    icon: <GridIcon />,
    name: "My Tasks or Assigned Items",
    roles: ["User"],
    subItems: [
      { name: "Upcoming follow-ups", path: "/", pro: false },
      { name: "Pending HR tasks", path: "/", pro: false },
      { name: "Reward redemptions", path: "/", pro: false },
    ],
  },
  {
    icon: <GridIcon />,
    name: "Recent Interactions",
    roles: ["User"],
    path: "/"
  },
  {
    icon: <GridIcon />,
    name: "Personal KPIs",
    roles: ["User"],
    path: "/",
  },
  {
    icon: <UserCircleIcon />,
    name: "Document Centers",
    roles: ["User"],
    path: "/",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const userRole = user?.role || "";

  const filterMenuItemsByRole = (items: NavItem[], role: string) => {
    return items
      .filter((item) => !item.roles || item.roles.includes(role))
      .map((item) => {
        if (!item.subItems) return item;
        const filteredSubItems = item.subItems.filter(
          (sub) => !sub.roles || sub.roles.includes(role)
        );
        return { ...item, subItems: filteredSubItems };
      })
      .filter((item) => !item.subItems || item.subItems.length > 0);
  };

  const filteredNavItems = filterMenuItemsByRole(navItems, userRole);

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index
                ? "menu-item-active"
                : "menu-item-inactive"
                } cursor-pointer ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
                }`}
            >
              <span
                className={`menu-item-icon-size  ${openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                    ? "rotate-180 text-brand-500"
                    : ""
                    }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
              >
                <span
                  className={`menu-item-icon-size ${isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                    }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${isActive(subItem.path)
                        ? "menu-dropdown-item-active"
                        : "menu-dropdown-item-inactive"
                        }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
      >
        <Link to="/" className="w-full flex justify-center">
          {isExpanded || isHovered || isMobileOpen ? (
            <span className="text-lg font-semibold tracking-wide text-gray-900 dark:text-white">
              MULTI-TENANT SAAS
            </span>
          ) : (
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              MTS
            </span>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(filteredNavItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;

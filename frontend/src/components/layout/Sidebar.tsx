import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAddress } from "@thirdweb-dev/react";

/**
 * Sidebar navigation component
 * Provides access to different sections of the application
 */
const Sidebar = () => {
  const router = useRouter();
  const address = useAddress();
  const [expanded, setExpanded] = useState({
    governance: false,
    distribution: false,
  });

  // Navigation items structure
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      name: "Participate",
      path: "/participate",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      name: "Tokenomics",
      path: "/tokenomics",
      icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      name: "Governance",
      path: "/governance",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      subItems: [
        { name: "Proposals", path: "/governance/proposals" },
        { name: "Create Proposal", path: "/governance/create" },
        { name: "Delegate", path: "/governance/delegate" },
      ],
    },
    {
      name: "Token Distribution",
      path: "/distribution",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      subItems: [
        { name: "Airdrop", path: "/distribution/airdrop" },
        { name: "Staking", path: "/distribution/staking" },
        { name: "Rewards", path: "/distribution/rewards" },
      ],
    },
  ];

  // Only show admin section if needed (could be based on role check)
  const isAdmin = false; // Replace with actual admin check
  if (isAdmin) {
    navItems.push({
      name: "Admin",
      path: "/admin",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      subItems: [
        { name: "Overview", path: "/admin" },
        { name: "Investors", path: "/admin/investors" },
        { name: "Whitelist", path: "/admin/whitelist" },
        { name: "Settings", path: "/admin/settings" },
      ],
    });
  }

  // Toggle expansion of submenu
  const toggleExpand = (section: string) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section as keyof typeof expanded],
    });
  };

  // Check if a path is active
  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="py-6 h-full">
      {/* User info section */}
      {address && (
        <div className="px-4 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-sm font-medium">Connected Wallet</div>
            <div className="text-xs text-gray-300 truncate mt-1">
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          </div>
        </div>
      )}

      {/* Navigation items */}
      <nav className="mt-6">
        <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Main Navigation
        </div>

        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-1">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.name.toLowerCase())}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                      isActive(item.path)
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                    <span>{item.name}</span>
                    <svg
                      className={`ml-auto h-4 w-4 transition-transform ${
                        expanded[
                          item.name.toLowerCase() as keyof typeof expanded
                        ]
                          ? "transform rotate-180"
                          : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {expanded[
                    item.name.toLowerCase() as keyof typeof expanded
                  ] && (
                    <ul className="mt-1 ml-8 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.path}>
                          <Link href={subItem.path} passHref>
                            <div
                              className={`block px-4 py-2 text-sm rounded-lg ${
                                isActive(subItem.path)
                                  ? "bg-gray-700 text-white"
                                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
                              }`}
                            >
                              {subItem.name}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link href={item.path} passHref>
                  <div
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                      isActive(item.path)
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                    <span>{item.name}</span>
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer section */}
      <div className="px-4 mt-12">
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium">Need Help?</h3>
          <p className="text-xs text-gray-300 mt-1">
            Check our documentation or contact support for assistance.
          </p>
          <a
            href="/docs"
            className="mt-2 text-xs font-medium text-blue-400 hover:text-blue-300 block"
          >
            View Documentation →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

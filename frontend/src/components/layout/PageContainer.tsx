import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useAddress } from "@thirdweb-dev/react";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showSidebar?: boolean;
  requiresAuth?: boolean;
}

/**
 * Main layout container for application pages
 *
 * @param children - Page content
 * @param title - Page title
 * @param description - Page description
 * @param showSidebar - Whether to show the sidebar
 * @param requiresAuth - Whether the page requires authentication
 */
const PageContainer = ({
  children,
  title,
  description,
  showSidebar = false,
  requiresAuth = false,
}: PageContainerProps) => {
  const address = useAddress();

  // Check if user needs to be authenticated but isn't
  const isAuthenticated = !requiresAuth || (requiresAuth && address);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />

      <div className="flex">
        {showSidebar && isAuthenticated && (
          <div className="w-64 min-h-[calc(100vh-64px)] bg-gray-800 border-r border-gray-700">
            <Sidebar />
          </div>
        )}

        <main className="flex-1">
          {title && (
            <div className="bg-gray-800 border-b border-gray-700 p-6">
              <h1 className="text-3xl font-bold">{title}</h1>
              {description && (
                <p className="text-gray-400 mt-2">{description}</p>
              )}
            </div>
          )}

          {!isAuthenticated ? (
            <div className="flex items-center justify-center h-[70vh]">
              <div className="text-center p-8 bg-gray-800 rounded-lg border border-gray-700 max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                  Authentication Required
                </h2>
                <p className="mb-6">
                  Please connect your wallet to access this page.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md">
                  Connect Wallet
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6">{children}</div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default PageContainer;

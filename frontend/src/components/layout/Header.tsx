import React, { useState } from "react"; 
import { useRouter } from "next/router";
import Link from "next/link";
import { ConnectButton , useActiveAccount } from "thirdweb/react"; 
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const client = createThirdwebClient({ clientId: "YOUR_CLIENT_ID" });

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const account = useActiveAccount();
  const address = account?.address;
  const router = useRouter();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Tokenomics", href: "/tokenomics" },
    { name: "Participate", href: "/participate" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  // Only show these if user is connected
  const authenticatedNavigation = [
    { name: "Governance", href: "/governance" },
    { name: "Distribution", href: "/distribution" },
  ];

  return (
    <header className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-white font-bold text-xl flex items-center"
            >
              <span className="text-blue-400 mr-1">Encrypia</span> ICO
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  router.pathname === item.href
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-300 hover:text-white"
                } px-3 py-2 text-sm font-medium`}
              >
                {item.name}
              </Link>
            ))}

            {address &&
              authenticatedNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    router.pathname === item.href
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-gray-300 hover:text-white"
                  } px-3 py-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ConnectButton  theme="dark" btnTitle="Connect Wallet" />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {/* Revertir a uso directo de componentes JSX */}
              {isMenuOpen ? (
                <RiCloseLine size={24} aria-hidden="true" /> 
              ) : (
                <RiMenu3Line size={24} aria-hidden="true" /> 
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  router.pathname === item.href
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {address &&
              authenticatedNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    router.pathname === item.href
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
          </div>

          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-2">
              <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

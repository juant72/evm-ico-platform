import Link from "next/link";
import {
  RiTwitterXFill,
  RiTelegramFill,
  RiDiscordFill,
  RiGithubFill,
  RiMediumFill,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link
              href="/"
              className="text-white font-bold text-xl flex items-center"
            >
              <span className="text-blue-400 mr-1">Encrypia</span> ICO
            </Link>
            <p className="mt-4 text-sm">
              Complete platform for launching and participating in ICOs with
              advanced features like tokenomics, DAO governance, and token
              distribution.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Platform
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/tokenomics"
                  className="text-gray-400 hover:text-white"
                >
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link
                  href="/participate"
                  className="text-gray-400 hover:text-white"
                >
                  Participate
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/governance"
                  className="text-gray-400 hover:text-white"
                >
                  Governance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Connect
            </h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <RiTwitterXFill className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <RiTelegramFill className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <RiDiscordFill className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <RiGithubFill className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <RiMediumFill className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Encrypia ICO. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Built on <span className="text-blue-400">Ethereum</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

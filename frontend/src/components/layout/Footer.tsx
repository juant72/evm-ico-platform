import Link from "next/link";
import {
  RiTwitterXFill,
  RiTelegramFill,
  RiDiscordFill,
  RiGithubFill,
  RiMediumFill,
} from "react-icons/ri";

const Footer = () => {
  const socialLinks = [
    {
      icon: RiTwitterXFill,
      href: "https://twitter.com/encrypia",
      label: "Twitter",
    },
    { icon: RiTelegramFill, href: "https://t.me/encrypia", label: "Telegram" },
    {
      icon: RiDiscordFill,
      href: "https://discord.gg/encrypia",
      label: "Discord",
    },
    {
      icon: RiGithubFill,
      href: "https://github.com/encrypia",
      label: "GitHub",
    },
    {
      icon: RiMediumFill,
      href: "https://medium.com/encrypia",
      label: "Medium",
    },
  ];

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} Encrypia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import Link from "next/link";
import { RiTwitterFill, RiTelegramFill, RiDiscordFill, RiGithubFill, RiMediumFill } from "react-icons/ri";
import { IconType } from 'react-icons';

// Modificamos la definición de SocialLink para usar un tipo más específico
interface SocialLink {
  icon: IconType;
  url: string;
  label: string;
}

// Definimos el array socialLinks fuera del componente para evitar recrearlo en cada render
const socialLinks: SocialLink[] = [
  { icon: RiTwitterFill, url: "https://twitter.com/encrypia", label: "Twitter" },
  { icon: RiTelegramFill, url: "https://t.me/encrypia", label: "Telegram" },
  { icon: RiDiscordFill, url: "https://discord.gg/encrypia", label: "Discord" },
  { icon: RiGithubFill, url: "https://github.com/encrypia", label: "GitHub" },
  { icon: RiMediumFill, url: "https://medium.com/encrypia", label: "Medium" }
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Primera columna: Logo y descripción */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-white font-bold text-xl flex items-center">
              <span className="text-blue-400 mr-1">Encrypia</span> ICO
            </Link>
            <p className="mt-4 text-sm">
              Complete platform for launching and participating in ICOs with advanced features like tokenomics, DAO governance, and token distribution.
            </p>
          </div>

          {/* Segunda columna: Enlaces Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/tokenomics" className="text-gray-400 hover:text-white">
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link href="/participate" className="text-gray-400 hover:text-white">
                  Participate
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/governance" className="text-gray-400 hover:text-white">
                  Governance
                </Link>
              </li>
            </ul>
          </div>

          {/* Tercera columna: Enlaces Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-white">Documentation</Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Cuarta columna: Conexión con redes sociales */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Connect</h3>
            <div className="mt-4 flex flex-wrap gap-4">
              {socialLinks.map((social) => {
                // Asignar a variable PascalCase para uso en JSX
                const IconComponent = social.icon; 
                
                return (
                  <a 
                    key={social.label}
                    href={social.url}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {/* Renderizar el componente directamente */}
                    <IconComponent size={24} aria-hidden="true" /> 
                  </a>
                );
              })}
            </div>
            <div className="mt-8">
              <p className="text-sm text-gray-400">
                &#169; {new Date().getFullYear()} Encrypia ICO. All rights reserved.
              </p>
              <p className="text-sm text-gray-400">
                Built on <span className="text-blue-400">Ethereum</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

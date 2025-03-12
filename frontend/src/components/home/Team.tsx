import React from "react";

/**
 * Team component displaying the team members and advisors
 */
const Team = () => {
  // Team members data
  const teamMembers = [
    {
      name: "David Mitchell",
      role: "CEO & Founder",
      bio: "Former CTO at BlockTech with 12+ years experience in blockchain technology.",
      image: "/images/team/person1.jpg",
      social: {
        twitter: "https://twitter.com/",
        linkedin: "https://linkedin.com/",
        github: "https://github.com/",
      },
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      bio: "Blockchain architect and Ethereum core contributor with expertise in smart contracts.",
      image: "/images/team/person2.jpg",
      social: {
        twitter: "https://twitter.com/",
        linkedin: "https://linkedin.com/",
        github: "https://github.com/",
      },
    },
    {
      name: "Michael Lee",
      role: "Head of Operations",
      bio: "Former VP at Goldman Sachs with experience in financial products and regulations.",
      image: "/images/team/person3.jpg",
      social: {
        twitter: "https://twitter.com/",
        linkedin: "https://linkedin.com/",
      },
    },
    {
      name: "Emily Wong",
      role: "Lead Developer",
      bio: "Experienced developer specializing in DeFi protocols and decentralized governance.",
      image: "/images/team/person4.jpg",
      social: {
        twitter: "https://twitter.com/",
        github: "https://github.com/",
      },
    },
  ];

  // Advisors data
  const advisors = [
    {
      name: "Dr. James Wilson",
      role: "Blockchain Advisor",
      bio: "Professor of Computer Science and researcher in distributed systems.",
      image: "/images/team/advisor1.jpg",
      social: {
        twitter: "https://twitter.com/",
        linkedin: "https://linkedin.com/",
      },
    },
    {
      name: "Elena Petrova",
      role: "Financial Advisor",
      bio: "Partner at Venture Capital firm with focus on crypto investments.",
      image: "/images/team/advisor2.jpg",
      social: {
        twitter: "https://twitter.com/",
        linkedin: "https://linkedin.com/",
      },
    },
  ];

  return (
    <div className="bg-gray-900 py-20" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Our Team
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Meet the experts behind our platform bringing years of experience in
            blockchain technology and financial markets.
          </p>
        </div>

        {/* Team members */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-blue-900/30 hover:shadow-xl"
            >
              <div className="h-64 bg-gray-700 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://via.placeholder.com/300x300?text=Team+Member";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-blue-400 mb-2">{member.role}</p>
                <p className="text-sm text-gray-400 mb-4">{member.bio}</p>

                {/* Social links */}
                <div className="flex space-x-4">
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="text-gray-400 hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">Twitter</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="text-gray-400 hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                      </svg>
                    </a>
                  )}
                  {member.social?.github && (
                    <a
                      href={member.social.github}
                      className="text-gray-400 hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">GitHub</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisors */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Our Advisors
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row"
              >
                <div className="md:w-1/3 h-full">
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-full h-48 md:h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://via.placeholder.com/300x300?text=Advisor";
                    }}
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-xl font-bold text-white">
                    {advisor.name}
                  </h3>
                  <p className="text-blue-400 mb-2">{advisor.role}</p>
                  <p className="text-sm text-gray-400 mb-4">{advisor.bio}</p>

                  {/* Social links */}
                  {advisor.social && (
                    <div className="flex space-x-4">
                      {advisor.social.twitter && (
                        <a
                          href={advisor.social.twitter}
                          className="text-gray-400 hover:text-blue-400"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="sr-only">Twitter</span>
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                      )}
                      {advisor.social.linkedin && (
                        <a
                          href={advisor.social.linkedin}
                          className="text-gray-400 hover:text-blue-400"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;

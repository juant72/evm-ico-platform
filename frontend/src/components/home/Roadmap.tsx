import React from "react";

/**
 * Roadmap component showing project timeline and milestones
 */
const Roadmap = () => {
  // Roadmap data with past, current, and future milestones
  const roadmapData = [
    {
      quarter: "Q1 2025",
      title: "Project Inception",
      description:
        "Initial concept development, team formation, and market research.",
      status: "completed",
      milestones: [
        "Core team assembled",
        "Whitepaper published",
        "Initial technical architecture defined",
        "Smart contract development began",
      ],
    },
    {
      quarter: "Q2 2025",
      title: "Platform Development",
      description: "Development of core platform features and token economics.",
      status: "completed",
      milestones: [
        "Smart contract audit completed",
        "Alpha version of the platform launched",
        "Private funding secured",
        "Tokenomics finalized",
      ],
    },
    {
      quarter: "Q3 2025",
      title: "ICO Launch",
      description: "Public token sale and exchange listings.",
      status: "current",
      milestones: [
        "Pre-sale launch",
        "Public ICO",
        "CEX/DEX listings",
        "Marketing campaign rollout",
      ],
    },
    {
      quarter: "Q4 2025",
      title: "Platform Expansion",
      description: "Expanding platform functionality and ecosystem growth.",
      status: "upcoming",
      milestones: [
        "DAO governance implementation",
        "Cross-chain integration",
        "Strategic partnerships",
        "Developer API release",
      ],
    },
    {
      quarter: "Q1 2026",
      title: "Ecosystem Development",
      description:
        "Building out the broader ecosystem and enhancing platform capabilities.",
      status: "upcoming",
      milestones: [
        "Mobile app launch",
        "DeFi product expansion",
        "Enterprise solutions",
        "Community growth initiatives",
      ],
    },
    {
      quarter: "Q2 2026",
      title: "Global Expansion",
      description:
        "Scaling the platform globally and enhancing interoperability.",
      status: "upcoming",
      milestones: [
        "Layer 2 solution integration",
        "International market penetration",
        "Advanced governance features",
        "Ecosystem fund establishment",
      ],
    },
  ];

  // Helper function to get status-based styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return {
          timeline: "bg-green-500",
          dot: "bg-green-500",
          card: "border-green-500",
          title: "text-green-400",
        };
      case "current":
        return {
          timeline: "bg-blue-500",
          dot: "bg-blue-500",
          card: "border-blue-500",
          title: "text-blue-400",
        };
      default:
        return {
          timeline: "bg-gray-600",
          dot: "bg-gray-600",
          card: "border-gray-600",
          title: "text-gray-400",
        };
    }
  };

  return (
    <div className="bg-gray-900 py-20" id="roadmap">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Project Roadmap
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Our development plan and key milestones for bringing this platform
            to life.
          </p>
        </div>

        {/* Vertical timeline for mobile */}
        <div className="md:hidden relative">
          <div className="absolute left-4 top-0 h-full w-1 bg-gray-700"></div>

          {roadmapData.map((phase, index) => {
            const style = getStatusStyle(phase.status);

            return (
              <div key={index} className="mb-12 ml-6 relative">
                <div
                  className={`absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-4 border-gray-900 ${style.dot}`}
                ></div>

                <div
                  className={`bg-gray-800 p-6 rounded-lg border-l-4 ${style.card}`}
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      phase.status === "completed"
                        ? "bg-green-900 text-green-300"
                        : phase.status === "current"
                        ? "bg-blue-900 text-blue-300"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {phase.quarter}
                  </span>
                  <h3 className={`text-xl font-bold ${style.title}`}>
                    {phase.title}
                  </h3>
                  <p className="text-gray-400 mt-2">{phase.description}</p>

                  <ul className="mt-4 space-y-2">
                    {phase.milestones.map((milestone, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className={`h-5 w-5 ${
                            phase.status === "completed"
                              ? "text-green-500"
                              : phase.status === "current"
                              ? "text-blue-500"
                              : "text-gray-500"
                          } mr-2 mt-0.5`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-300">{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Horizontal timeline for desktop */}
        <div className="hidden md:block relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-700"></div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {roadmapData.map((phase, index) => {
              const style = getStatusStyle(phase.status);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative ${isEven ? "mt-0 mb-24" : "mt-24 mb-0"}`}
                >
                  <div
                    className={`absolute left-1/2 top-${
                      isEven ? "full" : "0"
                    } transform -translate-x-1/2 ${
                      isEven ? "-translate-y-1/2" : "translate-y-1/2"
                    } h-12 w-1 ${style.timeline}`}
                  ></div>
                  <div
                    className={`absolute left-1/2 top-${
                      isEven ? "100%" : "0"
                    } transform -translate-x-1/2 ${
                      isEven ? "-translate-y-4" : "translate-y-4"
                    } h-8 w-8 rounded-full border-4 border-gray-900 ${
                      style.dot
                    }`}
                  ></div>

                  <div
                    className={`h-full bg-gray-800 p-6 rounded-lg border-t-4 ${style.card}`}
                  >
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                        phase.status === "completed"
                          ? "bg-green-900 text-green-300"
                          : phase.status === "current"
                          ? "bg-blue-900 text-blue-300"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {phase.quarter}
                    </span>
                    <h3 className={`text-xl font-bold ${style.title}`}>
                      {phase.title}
                    </h3>
                    <p className="text-gray-400 mt-2">{phase.description}</p>

                    <ul className="mt-4 space-y-2">
                      {phase.milestones.map((milestone, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg
                            className={`h-5 w-5 ${
                              phase.status === "completed"
                                ? "text-green-500"
                                : phase.status === "current"
                                ? "text-blue-500"
                                : "text-gray-500"
                            } mr-2 mt-0.5`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-gray-300">{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <div className="flex items-center">
            <span className="h-4 w-4 bg-green-500 rounded-full mr-2"></span>
            <span className="text-gray-300">Completed</span>
          </div>
          <div className="flex items-center">
            <span className="h-4 w-4 bg-blue-500 rounded-full mr-2"></span>
            <span className="text-gray-300">In Progress</span>
          </div>
          <div className="flex items-center">
            <span className="h-4 w-4 bg-gray-600 rounded-full mr-2"></span>
            <span className="text-gray-300">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;

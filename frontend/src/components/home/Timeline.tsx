import React from "react";
import { format } from "date-fns";

/**
 * Timeline component displaying ICO phases and key dates
 */
const Timeline = () => {
  // Timeline phases
  const timelineItems = [
    {
      title: "Seed Round",
      description: "Early investors and strategic partners",
      date: new Date(2025, 0, 15), // January 15, 2025
      status: "completed",
      allocation: "10,000,000 tokens",
      price: "$0.008 per token",
    },
    {
      title: "Private Sale",
      description: "Accredited investors and venture capitals",
      date: new Date(2025, 1, 20), // February 20, 2025
      status: "completed",
      allocation: "15,000,000 tokens",
      price: "$0.010 per token",
    },
    {
      title: "Public Sale",
      description: "Open participation for all investors",
      date: new Date(2025, 2, 15), // March 15, 2025
      status: "active",
      allocation: "20,000,000 tokens",
      price: "$0.012 per token",
    },
    {
      title: "Token Generation Event",
      description: "Tokens are created and distributed",
      date: new Date(2025, 3, 1), // April 1, 2025
      status: "upcoming",
      allocation: "-",
      price: "-",
    },
    {
      title: "Exchange Listing",
      description: "Token becomes available on exchanges",
      date: new Date(2025, 3, 15), // April 15, 2025
      status: "upcoming",
      allocation: "-",
      price: "-",
    },
  ];

  // Status indicator styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "active":
        return "bg-blue-500 animate-pulse";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            ICO Timeline
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Our roadmap for token launch and distribution across different
            phases.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-700 -ml-0.5"></div>

          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`relative mb-16 ${
                index % 2 === 0 ? "md:ml-0" : "md:ml-0"
              }`}
            >
              <div className="md:flex items-center">
                {/* Left side (even index) */}
                {index % 2 === 0 && (
                  <div className="hidden md:block md:w-1/2 pr-8 text-right">
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 mt-1">{item.description}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-300 mr-2">
                        {item.allocation}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900 text-purple-300">
                        {item.price}
                      </span>
                    </div>
                  </div>
                )}

                {/* Circle indicator */}
                <div className="absolute md:relative md:left-1/2 left-0 flex justify-center md:-ml-3 ml-6 mt-1.5 md:mt-0">
                  <div className="h-6 w-6 rounded-full border-4 border-gray-900 flex items-center justify-center">
                    <div
                      className={`h-3 w-3 rounded-full ${getStatusStyle(
                        item.status
                      )}`}
                    ></div>
                  </div>
                </div>

                {/* Mobile and right side */}
                <div
                  className={`md:w-1/2 pl-12 md:pl-8 ${
                    index % 2 === 0 ? "md:block" : "md:block"
                  }`}
                >
                  {/* Only show on mobile for even index */}
                  <div className="md:hidden mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 mt-1">{item.description}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-300 mr-2">
                        {item.allocation}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900 text-purple-300">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  {/* Shows on desktop for odd index and mobile for all */}
                  {index % 2 !== 0 && (
                    <div className="hidden md:block">
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 mt-1">{item.description}</p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-300 mr-2">
                          {item.allocation}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900 text-purple-300">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Date, shown for all items */}
                  <div
                    className={`bg-gray-700 rounded-lg p-4 mt-4 ${
                      index % 2 === 0 ? "" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-white">
                        {format(item.date, "MMMM d, yyyy")}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${getStatusStyle(
                          item.status
                        )} mr-2`}
                      ></div>
                      <span className="text-gray-300 text-sm capitalize">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/participate"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Participate in Current Phase
            <svg
              className="ml-2 -mr-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Timeline;

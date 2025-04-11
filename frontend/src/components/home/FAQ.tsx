import React, { useState } from 'react';

/**
 * FAQ component displaying common questions and answers about the ICO
 */
const FAQ = () => {
  // State for tracking which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({
    0: true, // First item expanded by default
  });

  // Toggle expansion state for an FAQ item
  const toggleItem = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // FAQ data with questions and answers
  const faqItems = [
    {
      question: 'What is an ICO?',
      answer: 'An Initial Coin Offering (ICO) is a fundraising method used by cryptocurrency projects to raise capital. Similar to an IPO in the stock market, an ICO allows investors to purchase tokens that may provide utility within the project ecosystem or potentially increase in value over time.'
    },
    {
      question: 'How can I participate in the ICO?',
      answer: 'To participate in our ICO, you need to: 1) Create an account on our platform, 2) Complete KYC/AML verification if required, 3) Connect your cryptocurrency wallet (MetaMask, etc.), 4) Purchase tokens using ETH or other supported cryptocurrencies during the sale period. Detailed instructions are available in the "Participate" section.'
    },
    {
      question: 'What are the minimum and maximum investment amounts?',
      answer: 'The minimum investment amount is 0.1 ETH (or equivalent). There is no strict maximum for individual investors, but we have implemented fair distribution mechanisms to prevent whale dominance. Specific investment tiers and allocation limits are detailed in the token sale documentation.'
    },
    {
      question: 'When will tokens be distributed?',
      answer: 'Initial token distribution will occur immediately after the ICO concludes, but most tokens will be subject to a vesting schedule. Typically, a portion of tokens (20-30%) will be immediately available, with the remainder released gradually according to the vesting schedule specified in our tokenomics documentation.'
    },
    {
      question: 'What is the token vesting schedule?',
      answer: 'Our vesting schedule is designed to ensure long-term commitment and prevent market flooding. Team tokens are locked for 12 months with a 24-month linear vesting period afterward. Investor tokens typically follow a 3-6 month cliff with 12-18 months of linear vesting, depending on the investment round. Full vesting details are available in the tokenomics section.'
    },
    {
      question: 'How is the token distribution structured?',
      answer: 'Our token distribution is structured to ensure sustainable growth and fair representation: 40% for public sale, 15% for team and advisors (with vesting), 15% for platform development and operations, 10% for marketing and partnerships, 10% for ecosystem growth, 5% for liquidity provision, and 5% for community incentives.'
    },
    {
      question: 'What blockchain is being used?',
      answer: 'Our token is deployed on the Ethereum blockchain as an ERC-20 standard token. We\'ve chosen Ethereum for its security, wide adoption, and robust smart contract capabilities. In the future, we plan to implement cross-chain functionality to enhance interoperability.'
    },
    {
      question: 'How does the DAO governance work?',
      answer: 'Our DAO governance allows token holders to propose and vote on changes to the protocol. Voting power is proportional to the number of tokens held or staked. Proposals require a minimum threshold of support to be considered and a majority vote to pass. The DAO oversees treasury management, protocol upgrades, and strategic decisions.'
    },
    {
      question: 'Is your smart contract audited?',
      answer: 'Yes, our smart contracts have been audited by multiple reputable security firms including CertiK and OpenZeppelin. The full audit reports are available in our documentation section. We place the highest priority on security and follow industry best practices for smart contract development.'
    },
    {
      question: 'What happens if the ICO doesn\'t reach its funding goal?',
      answer: 'If the ICO doesn\'t reach its soft cap, participants will be able to claim a refund of their contribution. If we reach the soft cap but not the hard cap, the project will proceed with the raised amount, and any unsold tokens will be either burned or allocated to the treasury based on community voting.'
    }
  ];

  return (
    <div className="bg-gray-900 py-20" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Everything you need to know about our ICO and token.
          </p>
        </div>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left focus:outline-none flex justify-between items-center"
              >
                <h3 className="text-lg font-medium text-white">{item.question}</h3>
                <span>
                  <svg
                    className={`w-6 h-6 text-gray-400 transform ${
                      expandedItems[index] ? 'rotate-180' : 'rotate-0'
                    } transition-transform duration-200`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`${
                  expandedItems[index]
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                } transition-all duration-300 ease-in-out overflow-hidden`}
              >
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-gray-300">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">
            Still have questions? Reach out to our support team.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Contact Support
            <svg
              className="ml-2 -mr-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/docs/whitepaper.pdf"
              className="flex flex-col items-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="h-10 w-10 text-blue-500 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-white font-medium">Whitepaper</span>
            </a>
            <a
              href="/docs/tokenomics.pdf"
              className="flex flex-col items-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="h-10 w-10 text-blue-500 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              <span className="text-white font-medium">Tokenomics</span>
            </a>
            <a
              href="/docs/audit-report.pdf"
              className="flex flex-col items-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="h-10 w-10 text-blue-500 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-white font-medium">Audit Report</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
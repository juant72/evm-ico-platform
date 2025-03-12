import { NextPage } from "next";
import Head from "next/head";
import PageContainer from "../components/layout/PageContainer";
import TokenDistribution from "../components/tokenomics/TokenDistribution";
import TokenAllocation from "../components/tokenomics/TokenAllocation";
import TokenMetrics from "../components/tokenomics/TokenMetrics";
import TokenUtility from "../components/tokenomics/TokenUtility";
import Card from "../components/common/Card";

/**
 * Tokenomics page - Display token distribution and metrics
 */
const TokenomicsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tokenomics | Encrypia</title>
        <meta
          name="description"
          content="Token distribution, metrics and utility"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer
        title="Tokenomics"
        description="Token distribution, metrics, and utility information"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card title="Token Distribution">
            <TokenDistribution />
          </Card>

          <Card title="Token Metrics">
            <TokenMetrics />
          </Card>
        </div>

        <Card title="Token Allocation" className="mb-8">
          <TokenAllocation />
        </Card>

        <Card title="Token Utility">
          <TokenUtility />
        </Card>

        {/* Token Release Schedule */}
        <div className="mt-8">
          <Card title="Token Release Schedule">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-700 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Allocation
                    </th>
                    <th className="px-4 py-3 bg-gray-700 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Percentage
                    </th>
                    <th className="px-4 py-3 bg-gray-700 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 bg-gray-700 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Vesting Schedule
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      Public Sale
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      40%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      400,000,000 tokens
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      30% at TGE, then 10% monthly for 7 months
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      Team
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      15%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      150,000,000 tokens
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      12 month cliff, then linear vesting for 24 months
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      Development
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      15%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      150,000,000 tokens
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      10% at TGE, then linear vesting for 36 months
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      Marketing
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      10%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      100,000,000 tokens
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      20% at TGE, then linear vesting for 18 months
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      Ecosystem
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      10%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      100,000,000 tokens
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      Linear vesting for 48 months
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      Liquidity
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      5%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      50,000,000 tokens
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      100% at TGE (locked in DEX)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      Community
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      5%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      50,000,000 tokens
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">
                      6 month cliff, then linear vesting for 12 months
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </PageContainer>
    </>
  );
};

export default TokenomicsPage;

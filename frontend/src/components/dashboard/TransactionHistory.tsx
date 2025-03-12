import React, { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  type: 'buy' | 'claim' | 'transfer' | 'stake';
  amount: number;
  token: string;
  date: Date;
  status: 'confirmed' | 'pending' | 'failed';
  txHash: string;
}

/**
 * Displays the user's transaction history
 */
const TransactionHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      generateTransactionHistory();
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const generateTransactionHistory = () => {
    // Sample transaction data - in a real app, this would come from your API or blockchain events
    const sampleTxns: Transaction[] = [
      {
        id: '1',
        type: 'buy',
        amount: 5000,
        token: 'ENC',
        date: new Date(Date.now() - 86400000), // yesterday
        status: 'confirmed',
        txHash: '0x3a4e9b85e7a0d5a7b9c1e8e2d7f8c6b5a4e3d2c1b0',
      },
      {
        id: '2',
        type: 'claim',
        amount: 1000,
        token: 'ENC',
        date: new Date(Date.now() - 3600000 * 2), // 2 hours ago
        status: 'confirmed',
        txHash: '0x4b5a9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1',
      },
      {
        id: '3',
        type: 'transfer',
        amount: 500,
        token: 'ENC',
        date: new Date(Date.now() - 3600000 * 5), // 5 hours ago
        status: 'confirmed',
        txHash: '0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0a1b2c3d4e5',
      },
      {
        id: '4',
        type: 'stake',
        amount: 2000,
        token: 'ENC',
        date: new Date(Date.now() - 86400000 * 3), // 3 days ago
        status: 'confirmed',
        txHash: '0x6d7e8f9a0b1c2d3e4f5a6b7c8d9e0a1b2c3d4e5f6',
      },
      {
        id: '5',
        type: 'buy',
        amount: 3000,
        token: 'ENC',
        date: new Date(Date.now() - 86400000 * 5), // 5 days ago
        status: 'confirmed',
        txHash: '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0a1b2c3d4e5f6g7',
      },
    ];
    
    setTransactions(sampleTxns);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return (
          <div className="bg-green-900/30 p-2 rounded-full">
            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        );
      case 'claim':
        return (
          <div className="bg-blue-900/30 p-2 rounded-full">
            <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
          </div>
        );
      case 'transfer':
        return (
          <div className="bg-purple-900/30 p-2 rounded-full">
            <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        );
      case 'stake':
        return (
          <div className="bg-yellow-900/30 p-2 rounded-full">
            <svg className="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Transaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-750">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTypeIcon(tx.type)}
                        <div className="ml-3">
                          <p className="text-sm font-medium text-white capitalize">{tx.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="text-sm text-white">{tx.amount.toLocaleString()} {tx.token}</p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-300">{formatDate(tx.date)}</p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tx.status === 'confirmed' 
                          ? 'bg-green-900 text-green-300'
                          : tx.status === 'pending'
                            ? 'bg-yellow-900 text-yellow-300'
                            : 'bg-red-900 text-red-300'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <a 
                        href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {`${tx.txHash.slice(0, 6)}...${tx.txHash.slice(-4)}`}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {transactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No transactions found.</p>
            </div>
          )}
          
          <div className="mt-4 flex justify-center">
            <button className="px-4 py-2 border border-gray-600 rounded-md text-sm text-gray-300 hover:border-gray-500 hover:text-white transition-colors">
              Load More
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
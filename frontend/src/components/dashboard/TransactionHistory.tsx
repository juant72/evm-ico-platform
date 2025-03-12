import React, { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import {
  formatTokenAmount,
  formatAddress,
  formatDate,
} from "../../utils/format";

const TransactionHistory: React.FC = () => {
  const { transactions, isLoading } = useTransactions();
  const [filter, setFilter] = useState("all");

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return "💰";
      case "stake":
        return "🔒";
      case "unstake":
        return "🔓";
      case "claim":
        return "🎁";
      default:
        return "💸";
    }
  };

  const filteredTransactions = transactions.filter(
    (tx) => filter === "all" || tx.type === filter
  );

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Transaction History</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white"
        >
          <option value="all">All</option>
          <option value="purchase">Purchases</option>
          <option value="stake">Stakes</option>
          <option value="claim">Claims</option>
        </select>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-700 rounded" />
          ))}
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No transactions found
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.hash}
              className="bg-gray-700 p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-4">
                  {getTransactionIcon(tx.type)}
                </span>
                <div>
                  <p className="text-white font-medium">{tx.type}</p>
                  <p className="text-sm text-gray-400">
                    {formatDate(tx.timestamp)} • {formatAddress(tx.hash)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">
                  {tx.type === "purchase"
                    ? "+"
                    : tx.type === "unstake"
                    ? "+"
                    : "-"}
                  {formatTokenAmount(tx.amount)}
                </p>
                {tx.price && (
                  <p className="text-sm text-gray-400">
                    @ ${tx.price.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;

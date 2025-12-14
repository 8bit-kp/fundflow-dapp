"use client";

import { useState } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import CampaignABI from "../contracts/CampaignABI";

export default function Donate({ campaignAddress }: { campaignAddress: string }) {
  const { isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const [amount, setAmount] = useState("");

  const donate = () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) return;

    writeContract({
      address: campaignAddress as `0x${string}`,
      abi: CampaignABI,
      functionName: "fund",
      value: parseEther(amount),
    });
  };

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Input Group */}
      <div className="relative flex-1">
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="block w-full rounded-lg border-0 py-2.5 pl-4 pr-12 text-slate-900 bg-gray-50 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-all"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-xs font-medium">ETH</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={donate}
        disabled={isPending || !amount}
        className={`
          flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
          ${
            isPending || !amount
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md"
          }
        `}
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending
          </span>
        ) : (
          "Donate"
        )}
      </button>
    </div>
  );
}
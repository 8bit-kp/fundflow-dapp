"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { useEffect, useState } from "react";

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (!mounted) return null;

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        {/* Wallet Badge */}
        <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 pl-3 pr-4 py-1.5 rounded-full transition-all hover:bg-gray-200">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <p className="text-xs font-mono font-medium text-slate-700">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>

        {/* Disconnect Action */}
        <button 
          onClick={() => disconnect()}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
          title="Disconnect Wallet"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => connect({ connector: metaMask() })}
      className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm transition-all active:scale-95"
    >
      <span>Connect Wallet</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </button>
  );
}
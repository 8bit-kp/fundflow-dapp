"use client";

import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import ConnectWallet from "./components/ConnectWallet";
import CreateCampaign from "./components/CreateCampaign";
import Donate from "./components/Donate";
import factoryABI from "./contracts/CampaignFactoryABI";

const FACTORY_ADDRESS = "0x557211E5acF40DD650AE2F47c5164d501E1DAc37";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { data } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: factoryABI,
    functionName: "getCampaigns",
  });

  if (!mounted) return null;

  const campaigns = (data as string[]) || [];

  return (
          <main className="min-h-screen bg-gray-50/50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* --- Header / Navigation --- */}
      <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            FundFlow
          </h1>
          <ConnectWallet />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        {/* --- Create Section --- */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm transition hover:shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Launch a Campaign</h2>
              <p className="text-sm text-slate-500 mt-1">
                Start your fundraising journey on the blockchain.
              </p>
            </div>
          </div>
          <div className="pt-2">
            <CreateCampaign />
          </div>
        </section>

        {/* --- Campaign List Section --- */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Active Campaigns</h3>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {campaigns.length} Total
            </span>
          </div>

          {campaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
              <p className="text-slate-400 font-medium">No active campaigns yet</p>
              <p className="text-sm text-slate-400 mt-1">Be the first to create one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map((address) => (
                <div 
                  key={address} 
                  className="group relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                        Contract Address
                      </span>
                      <p className="font-mono text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-100 truncate w-48 sm:w-auto">
                        {address}
                      </p>
                    </div>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <Donate campaignAddress={address} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );    
  }
# FundFlow – Decentralized Crowdfunding Platform

A full-stack Web3 crowdfunding application built on Ethereum that lets anyone launch fundraising campaigns and receive ETH directly through smart contracts. No middlemen. No custody. Just code and crypto.

FundFlow is not a demo toy. It is designed to reflect how real production dApps are structured, combining on-chain contracts, a modern frontend, and an off-chain backend indexer for speed and scalability.

---

## Overview

FundFlow enables users with a crypto wallet to:

- Create crowdfunding campaigns fully on-chain
- Donate ETH directly to campaign smart contracts
- Interact using MetaMask or compatible wallets
- Verify every action transparently on Ethereum

All funds move wallet-to-contract. There is no centralized backend holding user money.

---

## How It Works (High Level)

1. User connects wallet
2. User creates a campaign via the factory contract
3. A new campaign smart contract is deployed on-chain
4. Other users donate ETH directly to that contract
5. Campaign logic enforces goals, deadlines, withdrawals, or refunds

Everything critical happens on-chain.  
The backend only helps with indexing and fast reads.

---

## Core Features

- Trustless crowdfunding using smart contracts
- Factory pattern for scalable campaign deployment
- Direct ETH donations with no intermediaries
- Transparent, verifiable on-chain state
- Production-style Web3 architecture
- Clean and responsive frontend

---

## User Flow

### Launch a Campaign

Users can create a campaign by providing:

- **Goal Amount (ETH)** – how much ETH to raise
- **Duration (Days)** – campaign deadline

When **Start Campaign** is clicked:

1. Frontend sends a transaction to `CampaignFactory`
2. A new `Campaign` contract is deployed
3. `CampaignCreated` event is emitted
4. Backend indexer picks it up
5. UI updates automatically

Each campaign is its own independent smart contract.

---

### Active Campaigns

The Active Campaigns section displays all deployed campaigns.

For each campaign, users see:

- Campaign smart contract address
- ETH donation input
- Donate button

Every card represents a real Ethereum contract, not a database row.

---

## Donation Flow

1. User connects wallet
2. Enters ETH amount
3. Confirms transaction in wallet
4. ETH is sent directly to campaign contract
5. Campaign state updates on-chain instantly

There is zero backend custody of funds.  
All donations are peer-to-contract and fully auditable.

---

## Smart Contract Architecture

### CampaignFactory.sol

Responsibilities:

- Deploy new `Campaign` contracts
- Store all campaign addresses
- Emit `CampaignCreated` events for indexing

Uses the factory pattern to keep deployment logic clean and scalable.

---

### Campaign.sol

Each campaign contract:

- Accepts ETH via a payable `fund()` function
- Tracks total funds raised
- Stores individual contributor balances
- Enforces funding goal and deadline
- Supports withdrawals on success
- Supports refunds on failure

This keeps logic isolated, auditable, and secure.

---

## Frontend Architecture

- Built with **Next.js (App Router)**
- Styled using **Tailwind CSS**
- Wallet and blockchain interactions via **wagmi** and **viem**
- MetaMask integration
- Client-side safeguards to avoid hydration issues

The UI prioritizes clarity and transparency over gimmicks.

---

## Backend & Indexing

The backend exists to make the app usable at scale.

### What the Backend Does

- Listens to blockchain events
- Indexes campaigns into MongoDB
- Prevents duplicate entries
- Exposes fast APIs for the frontend

### Why This Is Needed

- Blockchain reads are slow
- On-chain data is hard to query
- Indexed data enables instant UI updates and analytics

This hybrid Web2 + Web3 model is how most serious dApps are built today.

---
![Alt Text Description](./fund.jpeg)

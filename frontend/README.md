# 🎨 FundFlow Frontend

Modern Next.js web application for the FundFlow decentralized crowdfunding platform with seamless Web3 integration.

## 📋 Overview

A responsive, type-safe frontend built with Next.js 16 and React 19, featuring real-time blockchain interactions through Wagmi hooks and MetaMask wallet integration.

## ✨ Features

- 🔐 **Wallet Connection** - Seamless MetaMask integration
- 📊 **Campaign Dashboard** - Browse all active campaigns
- ➕ **Create Campaigns** - Intuitive campaign creation interface
- 💰 **Fund Campaigns** - One-click ETH donations
- ⚡ **Real-time Updates** - Live campaign status tracking
- 🎨 **Modern UI** - Clean, responsive design with TailwindCSS
- 🔄 **Optimistic Updates** - Fast UX with TanStack Query
- 📱 **Mobile Responsive** - Works on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **React**: 19.2.1
- **TypeScript**: 5
- **Web3 Libraries**:
  - Wagmi 3.1.0 - React hooks for Ethereum
  - Viem 2.42.0 - TypeScript Ethereum library
  - MetaMask SDK 0.33.1
- **State Management**: TanStack Query 5.90.12
- **Styling**: TailwindCSS 4
- **Linting**: ESLint with Next.js config

## 📁 Project Structure

```
frontend/
├── app/
│   ├── components/
│   │   ├── ConnectWallet.tsx    # Wallet connection component
│   │   ├── CreateCampaign.tsx   # Campaign creation form
│   │   └── Donate.tsx           # Donation component
│   ├── contracts/
│   │   ├── CampaignABI.ts       # Campaign contract ABI
│   │   └── CampaignFactoryABI.ts # Factory contract ABI
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Main page component
│   └── providers.tsx            # Wagmi & Query providers
└── public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- MetaMask browser extension

### Installation

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. **Configure contract address:**

Update the factory address in `app/page.tsx`:
```typescript
const FACTORY_ADDRESS = "0x557211E5acF40DD650AE2F47c5164d501E1DAc37";
```

3. **Run development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open the app:**

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

### Hot Reload

The app supports hot module replacement. Edit `app/page.tsx` and see changes instantly.

### Component Development

Each component is located in `app/components/`:

- **ConnectWallet.tsx**: Handles wallet connection state and UI
- **CreateCampaign.tsx**: Form for creating new campaigns with validation
- **Donate.tsx**: Donation interface with transaction handling

### Contract Integration

ABIs are stored in `app/contracts/`:
```typescript
import factoryABI from "./contracts/CampaignFactoryABI";
import campaignABI from "./contracts/CampaignABI";
```

Use Wagmi hooks for contract interactions:
```typescript
const { data } = useReadContract({
  address: FACTORY_ADDRESS,
  abi: factoryABI,
  functionName: "getCampaigns",
});

const { write } = useWriteContract({
  address: campaignAddress,
  abi: campaignABI,
  functionName: "fund",
});
```

## 🎨 Styling

The project uses **TailwindCSS 4** with custom configuration:

- **Color Scheme**: Indigo/Slate palette
- **Typography**: System fonts with optimized loading
- **Responsive**: Mobile-first design
- **Dark Mode**: Ready for implementation

Global styles in `app/globals.css` provide base configurations.

## 🌐 Deployment

### Deploy on Vercel

The easiest way to deploy:

1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com/new)
3. Vercel will auto-detect Next.js and deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/8bit-krip/fundflow-dapp)

### Environment Variables

For production, set these in your deployment platform:
```env
NEXT_PUBLIC_FACTORY_ADDRESS=your_factory_address
NEXT_PUBLIC_CHAIN_ID=11155111
```

### Build Optimization

```bash
# Create optimized production build
npm run build

# Analyze bundle size
npm run build --analyze
```

## 🔗 Web3 Integration

### Wagmi Configuration

Providers are configured in `app/providers.tsx`:
- WagmiConfig with Sepolia testnet
- QueryClientProvider for data fetching
- MetaMask connector

### Contract Reads

```typescript
const { data, isLoading, error } = useReadContract({
  address: contractAddress,
  abi: contractABI,
  functionName: "functionName",
  args: [arg1, arg2],
});
```

### Contract Writes

```typescript
const { write, isLoading, isSuccess } = useWriteContract();

write({
  address: contractAddress,
  abi: contractABI,
  functionName: "functionName",
  args: [arg1, arg2],
  value: parseEther("1.0"),
});
```

## 📚 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - Learn about features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive tutorial
- [Next.js GitHub](https://github.com/vercel/next.js) - Source code and issues

### Web3 Resources
- [Wagmi Documentation](https://wagmi.sh) - React hooks for Ethereum
- [Viem Documentation](https://viem.sh) - TypeScript Ethereum library
- [MetaMask SDK](https://docs.metamask.io/wallet/how-to/use-sdk/) - Wallet integration

## 🤝 Contributing

When contributing to the frontend:
1. Follow the existing code style
2. Use TypeScript types for all components
3. Test wallet interactions on Sepolia testnet
4. Ensure responsive design works on mobile
5. Run `npm run lint` before committing

## 🐛 Troubleshooting

**Hydration Errors**: The app uses client-side mounting to prevent SSR hydration issues with Web3 providers.

**Wallet Connection Issues**: Ensure MetaMask is installed and connected to Sepolia testnet.

**Transaction Failures**: Check that you have sufficient SepoliaETH and the contract addresses are correct.

## 📝 License

MIT License

---

**Part of the FundFlow decentralized crowdfunding platform** • Built with Next.js and ❤️

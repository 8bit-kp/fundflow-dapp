# 📜 FundFlow Smart Contracts

Solidity smart contracts for the FundFlow decentralized crowdfunding platform, built with Foundry.

## 📋 Overview

This directory contains the core smart contracts that power FundFlow's trustless crowdfunding mechanism. The contracts implement a factory pattern to deploy individual campaign instances with automated fund management.

## 🏗️ Contract Architecture

### CampaignFactory.sol
Factory contract responsible for deploying new campaign instances.

**Key Features:**
- Deploys isolated Campaign contracts
- Maintains registry of all campaigns
- Emits creation events for indexing

**Functions:**
```solidity
function createCampaign(uint256 goal, uint256 duration) external returns (address)
function getCampaigns() external view returns (address[] memory)
```

### Campaign.sol
Individual crowdfunding campaign with complete lifecycle management.

**Key Features:**
- Time-based campaign lifecycle
- Automated goal tracking
- Secure fund withdrawal
- Contributor refund mechanism

**State Variables:**
- `creator` - Campaign creator address
- `goal` - Funding target in wei
- `deadline` - Campaign end timestamp
- `totalRaised` - Current funds raised
- `contributions` - Mapping of contributor addresses to amounts
- `withdrawn` - Withdrawal status flag

**Functions:**
```solidity
function fund() external payable
function withdraw() external
function refund() external
```

**Events:**
```solidity
event Funded(address indexed contributor, uint256 amount)
event Withdrawn(address indexed creator, uint256 amount)
event Refunded(address indexed contributor, uint256 amount)
```

## 🛠️ Built With Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:
- **Forge** - Ethereum testing framework (like Truffle, Hardhat and DappTools)
- **Cast** - Swiss army knife for interacting with EVM smart contracts
- **Anvil** - Local Ethereum node, akin to Ganache, Hardhat Network
- **Chisel** - Fast, utilitarian, and verbose solidity REPL

📖 **Documentation**: https://book.getfoundry.sh/

## 🚀 Quick Start

### Build Contracts

```shell
forge build
```

### Run Tests

```shell
forge test
```

Run with detailed output:
```shell
forge test -vvv
```

Run with gas reporting:
```shell
forge test --gas-report
```

### Format Code

```shell
forge fmt
```

### Generate Gas Snapshots

```shell
forge snapshot
```

## 🧪 Testing

The test suite is located in `test/Campaign.t.sol` and covers:
- Campaign creation
- Funding mechanisms
- Goal achievement scenarios
- Withdrawal conditions
- Refund logic
- Edge cases and failure modes

Run specific test:
```shell
forge test --match-test testFunctionName
```

## 📦 Deployment

### Local Deployment (Anvil)

1. Start local node:
```shell
anvil
```

2. Deploy contracts:
```shell
forge script script/DeployFactory.s.sol:DeployFactory --rpc-url http://localhost:8545 --broadcast
```

### Testnet Deployment (Sepolia)

```shell
forge script script/DeployFactory.s.sol:DeployFactory \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

### Environment Variables

Create a `.env` file:
```env
SEPOLIA_RPC_URL=your_rpc_url
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

Load environment:
```shell
source .env
```

## 🔐 Security Features

- ✅ Reentrancy protection on fund transfers
- ✅ Time-based access control
- ✅ Input validation and require checks
- ✅ Withdrawal guard with boolean flag
- ✅ Event emission for transparency
- ✅ Isolated campaign instances (factory pattern)

## 🌐 Deployed Contracts

### Sepolia Testnet
- **Factory Address**: `0x557211E5acF40DD650AE2F47c5164d501E1DAc37`
- **Network**: Ethereum Sepolia
- **Chain ID**: 11155111

## 🛠️ Development Commands

### Interact with Contracts (Cast)

Get campaign count:
```shell
cast call $FACTORY_ADDRESS "getCampaigns()(address[])" --rpc-url $SEPOLIA_RPC_URL
```

Fund a campaign:
```shell
cast send $CAMPAIGN_ADDRESS "fund()" --value 1ether --private-key $PRIVATE_KEY --rpc-url $SEPOLIA_RPC_URL
```

Check campaign details:
```shell
cast call $CAMPAIGN_ADDRESS "totalRaised()(uint256)" --rpc-url $SEPOLIA_RPC_URL
```

### Local Development (Anvil)

```shell
# Start local node
anvil

# Deploy to local node
forge script script/DeployFactory.s.sol:DeployFactory --fork-url http://localhost:8545 --broadcast
```

### Code Coverage

```shell
forge coverage
```

## 📚 Additional Resources

- **Foundry Book**: https://book.getfoundry.sh/
- **Solidity Docs**: https://docs.soliditylang.org/
- **OpenZeppelin**: https://docs.openzeppelin.com/contracts/

## 🤝 Contributing

When contributing to the smart contracts:
1. Write comprehensive tests for new features
2. Follow Solidity style guide
3. Add NatSpec comments to functions
4. Run `forge fmt` before committing
5. Ensure all tests pass with `forge test`

## 📝 License

MIT License

---

**Part of the FundFlow decentralized crowdfunding platform**

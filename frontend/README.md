# Encrypia ICO Platform

A comprehensive platform for launching and participating in Initial Coin Offerings (ICOs) with advanced features including tokenomics, DAO governance, and token distribution mechanisms.

## Core Features

### For Investors 🤝

- Multi-tier ICO participation with bonus structure
- Personalized investment dashboard
- Vesting schedule visualization
- Token claim interface based on distribution schedule
- DAO governance participation (voting, proposals)
- Token staking for rewards

### For Token Creators 🚀

- Token configuration and deployment tools
- ICO management dashboard
- Tokenomics and vesting setup
- Whitelist and KYC management
- Governance parameter configuration
- Token distribution tools

## Tokenomics y distribución

La plataforma permite definir y visualizar:

- Distribución inicial de tokens (equipo, inversores, reservas, etc.)
- Cronograma de liberación (vesting)
- Suministro circulante vs. suministro total
- Utilidad del token dentro del ecosistema
- Mecanismos de quema/emisión

## Gobernanza DAO

Implementamos un sistema de gobernanza descentralizada:

- Creación de propuestas por parte de poseedores de tokens
- Sistema de votación ponderado por tenencia de tokens
- Delegación de votos
- Ejecución automática de propuestas aprobadas
- Tablero de seguimiento de propuestas activas/pasadas

## Technical Stack

### Frontend Infrastructure

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Chart.js & Recharts
- **Web3**: ThirdWeb SDK & ethers.js

### Smart Contracts

- **Language**: Solidity ^0.8.19
- **Framework**: Forge/Foundry
- **Network**: Ethereum (Sepolia testnet)
- **Standards**: ERC20, ERC1155

## Getting Started

### Prerequisites

```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install Node.js dependencies
pnpm install
```

### Environment Setup

```bash
# Frontend environment
cp .env.example .env.local

# Forge environment
cp .env.example .env
```

### Development

```bash
# Start frontend
pnpm dev

# Start local blockchain
anvil

# Deploy contracts
forge script script/Deploy.s.sol:Deploy \
  --rpc-url http://localhost:8545 \
  --broadcast \
  --private-key $(cat .env | grep PRIVATE_KEY | cut -d '=' -f2)
```

### Testing

```bash
# Smart contract tests
forge test
forge test -vv  # Verbose output
forge test --fork-url $RPC_URL  # Fork testing

# Frontend tests
pnpm test
pnpm test:e2e
```

## Architecture

### Smart Contracts 📄

```solidity
contracts/
├── token/
│   ├── ICOToken.sol
│   └── Vesting.sol
├── governance/
│   ├── Governor.sol
│   └── TimeLock.sol
└── distribution/
    ├── Staking.sol
    └── Airdrop.sol
```

### Frontend Structure 🎯

```typescript
src/
├── components/
│   ├── dashboard/
│   ├── governance/
│   ├── distribution/
│   └── ico/
├── hooks/
│   ├── useVesting.ts
│   ├── useGovernance.ts
│   └── useStaking.ts
└── pages/
    ├── dashboard/
    ├── governance/
    └── admin/
```

## Security Features 🔒

- Multi-signature controls
- Time-locked governance
- Emergency pause mechanisms
- Role-based access control
- Rate limiting protection

## Contract Deployment

```bash
# Deploy to testnet
forge script script/Deploy.s.sol:Deploy \
  --rpc-url $RPC_URL \
  --broadcast \
  --verify \
  --etherscan-api-key $ETHERSCAN_KEY

# Verify contracts
forge verify-contract \
  --chain-id 11155111 \
  --compiler-version v0.8.19 \
  $CONTRACT_ADDRESS \
  src/ICOToken.sol:ICOToken \
  $ETHERSCAN_KEY
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

### Smart Contract Development

```bash
# Create new contract
forge create src/NewContract.sol:NewContract \
  --private-key $PRIVATE_KEY

# Run gas report
forge test --gas-report

# Generate documentation
forge doc
```

### Frontend Development

```bash
# Generate new component
pnpm plop component

# Update contract types
pnpm types:generate

# Lint code
pnpm lint
```

## Support & Resources

- Documentation: `/docs`
- Issues: GitHub Issues
- Discord: [Join Community](https://discord.gg/encrypia)
- Email: support@encrypia.io

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Roadmap 🗺️

### Q2 2024

- [ ] Multi-chain support
- [ ] Advanced analytics dashboard
- [ ] Mobile responsive design

### Q3 2024

- [ ] Automated market maker integration
- [ ] Cross-chain bridge support
- [ ] Enhanced security features

### Q4 2024

- [ ] Layer 2 integration
- [ ] Advanced DAO features
- [ ] DeFi integrations

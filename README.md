# ShieldFi

A decentralized insurance platform built on Base Network using Metal's token infrastructure.

## Overview

ShieldFi is a tokenized insurance application that leverages Metal's powerful APIs to create and manage tokens, user wallets, and transactions seamlessly. The platform operates exclusively on the Base Network, providing a secure and efficient environment for insurance services.

## Metal Integration

The application utilizes Metal's core APIs to handle token operations:

- **Create Token**: Deploying the SHIELD token on Base Network
- **Get Or Create Holder**: Managing user wallets and authentication
- **Distribute Token**: Handling token distributions and rewards
- **Get Token Holders**: Tracking token ownership and balances

## Key Features

- **Metal Wallet Integration**: Seamless wallet creation and management through Metal's infrastructure
- **Tokenized Insurance**: SHIELD tokens represent insurance coverage and capital pool participation
- **Base Network**: All core operations are executed on Base Network for optimal performance
- **User-Friendly Interface**: Intuitive UI for managing insurance policies and token holdings

## Technical Stack

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn-ui, Tailwind CSS
- **Token Infrastructure**: Metal API
- **Network**: Base Network

## Getting Started

1. Clone the repository:
```sh
git clone <repository-url>
cd safety-net-protocol
```

2. Install dependencies:
```sh
npm install
```

3. Set up environment variables:
Create a `.env` file with:
```
VITE_METAL_API_KEY=your_metal_api_key
VITE_SHIELD_TOKEN_ADDRESS=your_shield_token_address
```

4. Start the development server:
```sh
npm run dev
```

## Project Structure

- `src/components/`: React components
- `src/hooks/`: Custom React hooks
- `src/lib/`: Utility functions and configurations
- `src/pages/`: Main application pages
- `src/services`: Metal API Integration

## Metal API Integration

The application uses Metal's APIs for:

1. **User Authentication**:
   - Creating and managing user wallets
   - Handling wallet connections and disconnections

2. **Token Operations**:
   - Creating and managing SHIELD tokens
   - Distributing tokens to users
   - Tracking token balances and holders

3. **Transaction Management**:
   - Processing token transfers
   - Managing insurance claims and payouts


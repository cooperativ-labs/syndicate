# Syndicate: Real Estate Syndication Tokenization Platform

## Overview

Syndicate, developed by Cooperativ Labs Inc., is a solution for launching and managing private security offerings on Ethereum and Polygon. It streamlines the investment process, enabling efficient management of syndication deals. Learn more at [Cooperativ.io](https://cooperativ.io/syndicate).

Live at: [https://staging.syndicate.cooperativ.io/](https://staging.syndicate.cooperativ.io/)

Demo videos: [https://www.youtube.com/playlist?list=PLdUGBxGRPWz_n-tWwlKt_o6phKlHsR6CC](https://www.youtube.com/playlist?list=PLdUGBxGRPWz_n-tWwlKt_o6phKlHsR6CC)

## Smart Contracts:
- [ERC 1410 Cooperativ](https://github.com/cooperativ-labs/private-offering-contract/blob/main/contracts/ERC1410Standard.sol)
- [Swap Contract](https://github.com/cooperativ-labs/private-offering-contract/blob/main/contracts/swap.sol)
- [Distribution Contract](https://github.com/cooperativ-labs/private-offering-contract/blob/main/contracts/distribution.sol)

### Key Features:
- Syndication entity creation and management.
- Real estate asset tokenization.
- Smart contract deployment on the Ethereum blockchain.
- Facilitation of investor applications and approvals.
- Share purchase, sales, and distribution handling.

### Installation
1. Clone the repository: `git clone https://github.com/cooperativ-labs/syndicate`
2. Launch Docker
3. Install dependencies using Yarn: `yarn fresh`

### Running the Platform
1. Access it at `http://localhost:3000`.

### For Syndicators:
- **Account Setup**: Register and input personal information.
- **Entity Management**: Add General Partner and property-owning entities.
- **Offering Creation**: Define the offering, set up a smart contract for share issuance.
- **Legal Attachments**: Link legal documents, define share prices, and total availability.
- **Sales and Distributions**: Initiate and manage share sales and distributions.

### For Investors:
- **Investment Application**: Apply for investment opportunities using the syndicator's ID.
- **Share Purchasing**: Purchase shares once approved.
- **Share Trading**: List shares for sale.
- **Distribution Claims**: Claim earnings based on the distributions set in the smart contract.

## Technology Stack
- NextJS, Typescript, GraphQL, NextAuth, WAGMI, Viem
- Additional dependencies as listed in `package.json`

## Contributing
Contributions are welcome. Please follow our contribution guidelines in CONTRIBUTING.md.


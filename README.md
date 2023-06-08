# ERC4337 Account Abstraction Project

This project aims to leverage the ERC4337 Ethereum Protocol to implement Account Abstraction with a simple Account management system. The project provides the following features:

- Create Account: Provides the option to create a new account, with an additional capability to create an account from a signing key.
- Find Account by ID: Enables users to search for an account using a unique account ID.
- Get Smart Wallet Address: Retrieves the address of a smart wallet associated with an account.
- Transfer ETH: Enables users to transfer Ethereum (ETH) from one account to some Ethereum address.
- Transfer ERC20 token: Allows users to transfer ERC20 tokens from one account to some Ethereum address.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

```
git clone https://github.com/thunderjr/erc-4337-account-factory-nestjs
```

2. Navigate to the project directory:

```
cd erc-4337-account-factory-nestjs
```

3. Install the dependencies:

```
yarn install
```

4. Configure the Ethereum network settings:

   - Rename the `.env.example` file to `.env` in the project root directory.
   - Set your network provider RPC URL in the `RPC_URL` variable.
   - The `PAYMASTER_URL` is only required if you're sending `withPaymaster` on the request's body.

5. Start the application:

```
yarn start
```

## Usage

Once the application is running, you can interact with the API endpoints to perform various operations. Below are the available API endpoints:

- `POST /account`: Create a new account.
- `GET /account/:id`: Get account details by ID.
- `GET /accounts/:id/address`: Get the smart wallet address associated with an account.
- `POST /transaction/transfer/eth`: Transfer ETH from one account to some Ethereum address.
- `POST /transaction/erc20-transfer`: Transfer ERC20 tokens from one account to some Ethereum address.

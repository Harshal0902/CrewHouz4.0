# BIT10

BIT10 is an asset manager that lets users invest in multiple cryptocurrencies at once through index funds. Instead of picking individual coins, you buy one token that represents a group of top-performing assets.

## 🚀 The Problem

Investing in DeFi requires extensive research, and buying individual tokens often incurs high fees. Many users end up with an unbalanced portfolio, increasing risk and exposing them to poor-performing assets.

## 💡 The Solution

BIT10 provides a pre-selected basket of assets, reducing research time and cost. By buying one token, users invest in a diversified set of assets. With an auto-rebalancing mechanism, BIT10 optimizes portfolio performance by replacing poorly performing tokens with better ones.

## 🌐 Features

- **Diversified Exposure**: Gain exposure to multiple DeFi assets with a single token.
- **Auto-Rebalancing**: Regularly updates asset allocations to optimize performance.
- **Decentralized ETF**: Fully decentralized structure powered by the Internet Computer (ICP).

## 📂 Code Structure

### 🪴 Branches

* **`main`**: Contains code for Mainnet, including Smart Contracts/Canisters.
* **`testnet`**: Contains code for the Testnet version of the website.

### 🌲 Main Branch Folder Structure

* **`asset_storage/`** – Contains canister code for storing different token types:

  * `bsc_asset_storage/` - Stores BNB and BEP20 tokens.
  * `erc20_asset_storage/` - Stores ETH and ERC-20 tokens.
  * `icp_asset_storage/` - Stores ICP tokens.
  * `sui_asset_storage/` - Stores SUI tokens.
  * `trx_asset_storage/` - Stores TRX tokens.

* **`liquidity_hub/`**

  * `icp/`

    * `testnet_liquidity_hub/` – Canister code for the Liquidity Hub on ICP testnet.

* **`web_app/`** – Contains frontend code for the BIT10 application.


## 🛠 Tech Stack

- **Frontend**: Next.js, Shadcn/ui, Aceternity UI, motion-primitives
- **Backend**: tRPC, Drizzle, Nodemailer, Dfinity
- **Auth**: NextAuth
- **Data Visualization**: Recharts

## 🔗 ICP Canisters

- Oracle: [fg5vt-paaaa-aaaap-qhhra-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=fg5vt-paaaa-aaaap-qhhra-cai)
- BIT10.BTC Faucet: [5wxtf-uqaaa-aaaap-qpvha-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=5wxtf-uqaaa-aaaap-qpvha-cai)
- BIT10 Exchange Canister: [6phs7-6yaaa-aaaap-qpvoq-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=6phs7-6yaaa-aaaap-qpvoq-cai)
- BIT10 Testnet Liquidity Hub: [jskxc-iiaaa-aaaap-qpwrq-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=jskxc-iiaaa-aaaap-qpwrq-cai)
- BIT10.BTC: [eegan-kqaaa-aaaap-qhmgq-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=eegan-kqaaa-aaaap-qhmgq-cai)
- Test BIT10.DEFI: [hbs3g-xyaaa-aaaap-qhmna-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=hbs3g-xyaaa-aaaap-qhmna-cai)
- Test BIT10.BRC20: [uv4pt-4qaaa-aaaap-qpuxa-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=uv4pt-4qaaa-aaaap-qpuxa-cai)
- Test BIT10.TOP: [wbckh-zqaaa-aaaap-qpuza-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=wbckh-zqaaa-aaaap-qpuza-cai)
- Test BIT10.MEME: [yeoei-eiaaa-aaaap-qpvzq-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=yeoei-eiaaa-aaaap-qpvzq-cai)
- BIT10.DEFI: [bin4j-cyaaa-aaaap-qh7tq-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=bin4j-cyaaa-aaaap-qh7tq-cai)
- BIT10.BRC20: [7bi3r-piaaa-aaaap-qpnrq-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=7bi3r-piaaa-aaaap-qpnrq-cai)

## 🏁 Getting Started

To start using BIT10, follow these steps:

1. **Install Dependencies**:
    ```bash
    npm install
    ```

2. **Run the App**:
    ```bash
    npm run dev
    ```

3. **Access** the app at [http://localhost:3000](http://localhost:3000).

## 📐 Architecture Overview

BIT10 is structured using:

- **Next.js** for the frontend framework.
- **Node.js** for the backend framework.
- **Dfinity** for decentralized canister management.
- **Drizzle ORM** for efficient database interaction.
- **tRPC** for type-safe API routing.

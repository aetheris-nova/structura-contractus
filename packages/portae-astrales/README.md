<div align="center">
  <a href="https://aetherisnova.org">
    <img alt="An ornate golden compass surrounded by orbs" src="../../docs/images/emblem@128x128.png" height="128" />
  </a>
</div>

<div align="center">

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-brightgreen.svg)](./LICENSE)

</div>

<h1 align="center">
  Structura Contractus - Portae Astrales
</h1>

<p align="center">
  The Portae Astrales schema allows the construction of a great Porta of Aetheris Nova, facilitating safe traversal of the Aether.
</p>

---

### Table Of Contents

* [1. Overview](#-1-overview)
* [2. Getting Started](#-2-getting-started)
  - [2.1. Installation](#21-installation)
  - [2.2. Contracts](#22-contracts)
    - [2.2.1. Deploying Contracts](#221-deploying-contracts)
    - [2.2.2. Testing Contracts](#222-testing-contracts)
  - [2.3. Client](#23-client)
* [3. Appendix](#-3-appendix)
  - [3.1. Useful Commands](#31-useful-commands)
* [4. License](#-4-license)

## 🗂️ 1. Overview

TODO.

## 🪄 2. Getting Started

### 2.1. Installation

Simply run:

```shell
pnpm install
```

> ⚠️ **NOTE:** This will also run a post-install script ([`./scripts/postinstall.sh`](./scripts/postinstall.sh)) that create an `.env` file, if one doesn't exist.

<sup>[Back to top ^][table-of-contents]</sup>

### 2.2. Contracts

#### 2.2.1. Deploying Contracts

You can deploy the contracts by using:

```shell
pnpm deploy
```

> 🚨 **WARNING:** Where the contracts are deployed, i.e. the RPC URL, the contract address of the MUD world and the private key of the deployer, depends on the values of the `.env`. Ensure you have the correct values configured.

<sup>[Back to top ^][table-of-contents]</sup>

#### 2.2.2. Testing Contracts

<sup>[Back to top ^][table-of-contents]</sup>

### 2.3. Client

TODO.

<sup>[Back to top ^][table-of-contents]</sup>

## 📑 3. Appendix

### 3.1. Useful Commands

| Command                | Description                                                                                                                                                                  |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `pnpm build`           | Builds the contract and client to the `dist/` directory.                                                                                                                     |
| `pnpm build:client`    | Builds the client to the `dist/client` directory.                                                                                                                            |
| `pnpm build:contracts` | Builds the contracts to the `dist/contracts` directory.                                                                                                                      |
| `pnpm clean`           | Cleans the client and contract built code.                                                                                                                                   |
| `pnpm clean:client`    | Deletes the `dist/client` directory and removes the TypeScript build configuration files.                                                                                    |
| `pnpm clean:contracts` | Deletes the `dist/contracts` directory and runs `forge clean`.                                                                                                               |
| `pnpm deploy`          | Deploys the contracts using the values from the created `.env`.                                                                                                              |
| `pnpm lint`            | Lints all source files.                                                                                                                                                      |
| `pnpm lint:client`     | Lints the client source files.                                                                                                                                               |
| `pnpm lint:contracts`  | Lints all the `.sol` files.                                                                                                                                                  |
| `pnpm prettier`        | Formats all the `.js`, `.json`, `.sol` and `.ts` files.                                                                                                                      |
| `pnpm test`            | Runs both the client and contract tests.                                                                                                                                     |
| `pnpm test:client`     | Runs the client tests.                                                                                                                                                       |
| `pnpm test:contracts`  | Deploys the contracts to a local instance of Anvil and runs the `forge test` against the local instance. **NOTE:** This command assumes you have the local version of Anvil  |

<sup>[Back to top ^][table-of-contents]</sup>

## 📄 4. License

Please refer to the [LICENSE][license] file.

<sup>[Back to top ^][table-of-contents]</sup>

<!-- links -->
[table-of-contents]: #table-of-contents
[license]: ./LICENSE

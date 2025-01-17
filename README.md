<div align="center">
  <a href="https://aetherisnova.org">
    <img alt="An ornate golden compass surrounded by orbs" src="docs/images/emblem@128x128.png" height="128" />
  </a>
</div>

<div align="center">
  <h1 align="center">
    Structura Contractus
  </h1>
</div>

---

<p align="center">
  The Structura Contractus of Aetheris Nova is the vault that houses the schemas used by the Ordo Aedificatorum.
</p>

### Table Of Contents

* [1. Overview](#-1-overview)
  - [1.1. Monorepo Project Structure](#11-monorepo-project-structure)
* [2. Getting Started](#-2-getting-started)
  - [2.1. Requirements](#21-requirements)
  - [2.2. Installation](#22-installation)
* [3. Appendix](#-3-appendix)
  - [3.1. Packages](#31-packages)
* [4. How To Contribute](#-4-how-to-contribute)

## 🗂️ 1. Overview

### 1.1. Monorepo Project Structure

The repo follows the following structure:

```text
.
├─ packages
│   ├── <package>
│   │   ├── .lintstagedrc.mjs
│   │   ├── .releaserc        <-- semantic release configuration
│   │   ├── LICENSE
│   │   ├── package.json      <-- contains package dependencies and is used to run package-level scripts
│   │   ├── README.md
│   │   └── ...
│   └── ...                   <-- other packages
├── package.json              <-- root package.json that contains top-level dependencies and tools
└── ...
```

## 🪄 2. Getting Started

### 2.1. Requirements

* Install [Node v20.18.0+](https://nodejs.org/en/) (LTS as of 9th November 2024)
* Install [pnpm v8+](https://pnpm.io/installation)
* Install [Foundry](https://book.getfoundry.sh/getting-started/installation)

<sup>[Back to top ^][table-of-contents]</sup>

### 2.2. Installation

1. Install the dependencies using:

```shell
pnpm install
```

<sup>[Back to top ^][table-of-contents]</sup>

## 📑 3. Appendix

### 3.1. Apps

| Name                                                      | Description                                                                                                                      |
|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| [`portae-astrales`](./packages/portae-astrales/README.md) | The Portae Astrales schema allows the construction of a great Porta of Aetheris Nova, facilitating safe traversal of the Aether. |

<sup>[Back to top ^][table-of-contents]</sup>

## 👏 4. How To Contribute

Please read the [**Contributing Guide**](./CONTRIBUTING.md) to learn about the development process.

<sup>[Back to top ^][table-of-contents]</sup>

<!-- links -->
[table-of-contents]: #table-of-contents

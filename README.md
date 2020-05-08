<!-- @format -->

# crypotstar-dapp

A dApp for transferring, exchanging and claiming ownership over stars over the ethereum network.

## Truffle version and OpenZeppelin version used in the project.

- Truffle v5.1.24 (core: 5.1.24)
- Solidity v0.5.16 (solc-js)
- Node v10.16.0
- Web3.js v1.2.1
- Openzeppelin-solidity v2.1.2

## My ERC-721 Token

- Token - BlackStarLine
- Symbol - BLK

## Token Address

Rinkeby - [transaction hash:0xb68d3a4114e1e817c9ffae32215aa92e10d60b39263f1ca0cdf6ad559b2755b3](https://rinkeby.etherscan.io/tx/0xb68d3a4114e1e817c9ffae32215aa92e10d60b39263f1ca0cdf6ad559b2755b3)

and also [Decompiled Contract Source Code](https://rinkeby.etherscan.io/bytecode-decompiler?a=0x404b3c6b29bd19888eb5700fe9e3ec9b6edce75c)

## Setup Instructions

### This project uses truffle so please ensure you have it installed

```
 npm i truffle - g
```

then

```
cd crypostarr && truffle develop
```

This will get the local ethereum node up and running, in another terminal:

```
cd app/ && npm run dev
```

To run the front end. Ensure your [Wallet](https://metamask.io/) is connected to `http://localhost:9545` .

## Test

To run tests simply:

1.  `truffle develop`

2.  `compile`

3.  `migrate`

4.  `test`

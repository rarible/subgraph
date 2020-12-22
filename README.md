# Protocol subgraph

The subgraph provides information about buys on https://rarible.com, including fee amounts.

In the current version, only `ExchangeV1` contract events are handled. Other contracts will be added soon.

The graphql schema is still under heavy development and will likely have major changes and improvements.

### Installation/Development

Please follow the official documentation - https://thegraph.com/docs/define-a-subgraph#install-the-graph-cli.

## Entity

**Deal** - represents `Buy` event
- **seller** - seller's address
- **buyer** - buyer's address
- **sellToken** - token to sell address
- **buyToken** - token to buy address
- **amount** - amount of tokens to buy
- **price** - price of a token to buy
- **txHash** - transaction hash
- **fee** - fee in a token to buy currency
- **blockNumber** - block number of the event
- **blockTime** - block time the event was processed

## Queries

**List of deals**
```GraphQL
{
  deals(first: 10) {
    seller
    buyer
    sellToken
    buyToken
    amount
    price
    fee
    txHash
    blockNumber
    blockTime
  }
}
```
The number of entities are specified with `first` flag.

**Deal by transaction hash**
```GraphQL
{
  deals(where: {txHash: "0xb16af8089c8b5cf697a67cf2be5308f3987256713168bd57400892740d99b361"}) {
    seller
    buyer
    sellToken
    buyToken
    amount
    price
    fee
    txHash
    blockNumber
    blockTime
  }
}
```


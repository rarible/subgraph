# Protocol subgraph

The [subgraph](https://thegraph.com/explorer/subgraph/rarible/protocol) provides information on purchases at [Rarible](https://rarible.com), including commission amounts.

Contracts support status in the current version:

- [x] TokenSale
- [x] ERC721SaleV1
- [x] ERC721SaleV2
- [x] ERC1155SaleV1
- [x] ERC1155SaleV2
- [x] ExchangeV1

The graphql schema is still under heavy development and will likely have major changes and improvements.

## Installation/Development

Please follow the official [documentation](https://thegraph.com/docs/define-a-subgraph).

## Entities

**Deal** - represents the `Buy` event
- **type** - deal initiation method (`Order` or `Bid`)
- **seller** - seller's address
- **buyer** - buyer's address
- **sellTokenId** - token to sell id
- **sellToken** - token to sell address
- **buyToken** - token to buy address
- **sellAmount** - amount of `sellToken`
- **buyAmount** - amount of `buyToken`
- **price** - price in a `buyToken` currency
- **fee** - fee in a `buyToken` currency
- **txHash** - transaction hash
- **blockNumber** - number of the block
- **blockTime** - timestamp of the block
- **contract** - `ContractType`

**Block** - represents the ethereum block
- **blockNumber** - number of the block
- **blockTime** - timestamp of the block

**Counter** - counter for each `ContractType`
- **count** -  number of events under the specified `contract`
- **firstBlock** - `Block` of the first event
- **lastBlock** - `Block` of the last event
- **contract** - `ContractType`

## Enumerations

**DealType** - enumerates deal initiation methods
- **Order**
- **Bid**

**ContractType** - enumeration for contracts
- **TokenSale**
- **ERC721SaleV1**
- **ERC721SaleV2**
- **ERC1155SaleV1**
- **ERC1155SaleV2**
- **ExchangeV1**

## Queries

HTTP queries can be accessed at: https://api.thegraph.com/subgraphs/name/rarible/protocol.

**List of deals**
```GraphQL
{
    deals (first: 10) {
        seller
        buyer
        sellTokenId
        sellToken
        buyToken
        sellAmount
        buyAmount
        price
        fee
        txHash
        blockNumber
        blockTime
        contract
    }
}
```
> The number of entities can be limited with `first` flag

**List of deals specified by a contract**
```GraphQL
{
    deals (where: { contract: ExchangeV1 }) {
        seller
        buyer
        sellTokenId
        sellToken
        buyToken
        sellAmount
        buyAmount
        price
        fee
        txHash
        blockNumber
        blockTime
        contract
    }
}
```
> see `ContractType` enumeration for possible `contract` values

**List of counters for contracts**
```GraphQL
{
    counters {
        count
        firstBlock {
            blockNumber
            blockTime
        }
        lastBlock {
            blockNumber
            blockTime
        }
        contract
    }
}
```

## Suggestions

You are welcome to [suggest features](https://github.com/rarible/protocol/discussions) and [report bugs found](https://github.com/rarible/protocol/issues)!

## License

Protocol subgraph is available under [MIT License](LICENSE.md).
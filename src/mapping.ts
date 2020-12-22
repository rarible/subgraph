import {
    BigInt, BigDecimal
} from "@graphprotocol/graph-ts"
import {
    Buy
} from "../generated/ExchangeV1/ExchangeV1"
import {
    Deal
} from "../generated/schema"

export function handleBuy(event: Buy): void {
    let dealId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let deal = Deal.load(dealId)

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (deal == null) {
        deal = new Deal(dealId)
    }

    if (event.params.buyTokenId == BigInt.fromI32(0)) {
        deal.seller = event.params.owner
        deal.buyer = event.params.buyer
        deal.sellToken = event.params.sellToken
        deal.buyToken = event.params.buyToken
        deal.amount = event.params.buyValue * event.params.amount / event.params.sellValue
        deal.price =  event.params.buyValue / event.params.sellValue
    } else if (event.params.sellTokenId == BigInt.fromI32(0)){
        deal.seller = event.params.buyer
        deal.buyer = event.params.owner
        deal.sellToken = event.params.buyToken
        deal.buyToken = event.params.sellToken
        deal.amount = event.params.amount
        deal.price = event.params.sellValue / event.params.buyValue
    }

    deal.fee = deal.amount.toBigDecimal() * deal.price.toBigDecimal() * BigDecimal.fromString("0.05")
    deal.txHash = event.transaction.hash
    deal.blockNumber = event.block.number
    deal.blockTime = event.block.timestamp
    // Entities can be written to the store with `.save()`
    deal.save()

    // Note: If a handler doesn't require existing field values, it is faster
    // _not_ to load the entity from the store. Instead, create it fresh with
    // `new Entity(...)`, set the fields that should be updated and save the
    // entity back to the store. Fields that were not set or unset remain
    // unchanged, allowing for partial updates to be applied.

    // It is also possible to access smart contracts from mappings. For
    // example, the contract that has emitted the event can be connected to
    // with:
    //
    // let contract = Contract.bind(event.address)
    //
    // The following functions can then be called on this contract to access
    // state variables and other data:
    //
    // - contract.beneficiary(...)
    // - contract.buyerFeeSigner(...)
    // - contract.erc20TransferProxy(...)
    // - contract.isOwner(...)
    // - contract.ordersHolder(...)
    // - contract.owner(...)
    // - contract.prepareBuyerFeeMessage(...)
    // - contract.prepareMessage(...)
    // - contract.state(...)
    // - contract.transferProxy(...)
    // - contract.transferProxyForDeprecated(...)
}

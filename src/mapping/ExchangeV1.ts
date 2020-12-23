import {
    BigInt, BigDecimal, Address
} from "@graphprotocol/graph-ts"
import {
    Buy
} from "../../generated/ExchangeV1/ExchangeV1"
import {
    Deal
} from "../../generated/schema"

export function handleBuy(event: Buy): void {
    let dealId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let deal = Deal.load(dealId)

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

    if (deal.buyToken == Address.fromString("0x0000000000000000000000000000000000000000")) {
        deal.buyToken = Address.fromString("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2")
    }
    deal.fee = deal.amount.toBigDecimal() * deal.price.toBigDecimal() * BigDecimal.fromString("0.05")

    deal.txHash = event.transaction.hash
    deal.blockNumber = event.block.number
    deal.blockTime = event.block.timestamp
    deal.contract = "ExchangeV1"
    deal.save()
}

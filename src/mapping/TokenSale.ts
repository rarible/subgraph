import {
    Buy
} from "../../generated/TokenSale/TokenSale"
import {
    Deal
} from "../../generated/schema"
import {Address, BigDecimal, BigInt} from "@graphprotocol/graph-ts/index";

export function handleBuy(event: Buy): void {
    let dealId = event.transaction.hash.toHex() + "-" + event.logIndex.toString() + "-" + "TokenSale"
    let deal = Deal.load(dealId)
    if (deal == null) {
        deal = new Deal(dealId)
    }
    deal.seller = event.params.seller
    deal.buyer = event.params.buyer
    deal.sellToken = event.params.token
    deal.buyToken = Address.fromString("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2")
    deal.amount = BigInt.fromI32(1)
    deal.price =  event.params.price
    deal.fee = deal.price.toBigDecimal() * BigDecimal.fromString("0.05")

    deal.txHash = event.transaction.hash
    deal.blockNumber = event.block.number
    deal.blockTime = event.block.timestamp
    deal.contract = "TokenSale"
    deal.save()
}

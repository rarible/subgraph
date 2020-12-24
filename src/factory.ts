import { Deal } from "../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts/index"
import { DealType } from "./enum"

export function initDeal(event: ethereum.Event, contract: string): Deal {
    let dealId = event.transaction.hash.toHex() + "-" + event.logIndex.toString() + "-" + contract
    let deal = Deal.load(dealId)
    if (deal == null) {
        deal = new Deal(dealId)
        deal.type = DealType.ORDER
        deal.txHash = event.transaction.hash
        deal.blockNumber = event.block.number
        deal.blockTime = event.block.timestamp
        deal.contract = contract
    }

    return deal as Deal
}
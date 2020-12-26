import { Block, Deal, Counter } from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"
import { ethereum } from "@graphprotocol/graph-ts/index"
import { DealType } from "./enum"

function initBlock(eventBlock: ethereum.Block): string {
    let id = eventBlock.number.toHexString()
    let block = Block.load(id)
    if (block == null){
        block = new Block(id)
        block.blockNumber = eventBlock.number
        block.blockTime = eventBlock.timestamp
        block.save()
    }

    return id
}

function initCounter(contract: string, blockId: string): void {
    let counter = Counter.load(contract)
    if (counter == null) {
        counter = new Counter(contract)
        counter.count = BigInt.fromI32(0)
        counter.contract = contract
        counter.firstBlock = blockId
    }
    counter.lastBlock = blockId
    counter.count = counter.count.plus(BigInt.fromI32(1))
    counter.save()
}

export function initDeal(event: ethereum.Event, contract: string): Deal {
    let blockId = initBlock(event.block)

    let id = (event.transaction.hash.toHex() + "-" + event.logIndex.toString() + "-" + contract)
    let deal = Deal.load(id)
    if (deal == null) {
        deal = new Deal(id)
        deal.type = DealType.ORDER
        deal.txHash = event.transaction.hash
        deal.block = blockId
        deal.contract = contract
    }

    initCounter(contract, blockId)

    return deal as Deal
}
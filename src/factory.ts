import { Block, Deal, Counter } from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"
import { ethereum } from "@graphprotocol/graph-ts/index"
import { DealType } from "./enum"

function initBlock(eventBlock: ethereum.Block): Block {
    let id = eventBlock.number.toHexString()
    let block = Block.load(id)
    if (block == null){
        block = new Block(id)
        block.number = eventBlock.number
        block.time = eventBlock.timestamp
        block.save()
    }

    return block as Block
}

function initCounter(contract: string, block: Block): void {
    let counter = Counter.load(contract)
    if (counter == null) {
        counter = new Counter(contract)
        counter.count = BigInt.fromI32(0)
        counter.contract = contract
        counter.firstBlock = block.id
    }
    counter.lastBlock = block.id
    counter.count = counter.count.plus(BigInt.fromI32(1))
    counter.save()
}

export function initDeal(event: ethereum.Event, contract: string): Deal {
    let block = initBlock(event.block)

    let id = (event.transaction.hash.toHex() + "-" + event.logIndex.toString() + "-" + contract)
    let deal = Deal.load(id)
    if (deal == null) {
        deal = new Deal(id)
        deal.type = DealType.ORDER
        deal.txHash = event.transaction.hash
        deal.blockNumber = block.number as BigInt
        deal.blockTime = block.time as BigInt
        deal.contract = contract
    }
    initCounter(contract, block)

    return deal as Deal
}
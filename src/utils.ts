import { Deal } from "../generated/schema"
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts/index"
import { Coefficient } from "./enum"

export function calculatePriceAndFee(deal: Deal): void {
    deal.price = calculatePrice(deal.buyAmount, deal.sellAmount)
    deal.fee = calculateFee(deal.buyAmount)
}

function calculatePrice(buyAmount: BigInt, sellAmount: BigInt): BigInt {
    if (buyAmount == BigInt.fromI32(0) || sellAmount == BigInt.fromI32(0)){
        return BigInt.fromI32(0)
    }
    return buyAmount.div(sellAmount)
}

function calculateFee(buyAmount: BigInt): BigDecimal {
    if (buyAmount == BigInt.fromI32(0)){
        BigDecimal.fromString("0")
    }
    return buyAmount.toBigDecimal().times(BigDecimal.fromString(Coefficient.FEE))
}
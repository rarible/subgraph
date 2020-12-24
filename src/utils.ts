import { Deal } from "../generated/schema"
import { BigDecimal, BigInt } from "@graphprotocol/graph-ts/index"
import { Coefficient } from "./enum"

export function calculatePriceAndFee(deal: Deal): void {
    deal.price = calculatePrice(deal.buyAmount, deal.sellAmount)
    deal.fee = calculateFee(deal.buyAmount)
}

function calculatePrice(buyAmount: BigInt, sellAmount: BigInt): BigInt {
    return buyAmount / sellAmount
}

function calculateFee(buyAmount: BigInt): BigDecimal {
    return buyAmount.toBigDecimal() * BigDecimal.fromString(Coefficient.FEE)
}
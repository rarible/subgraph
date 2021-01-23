import { Buy } from "../../generated/ExchangeV1/ExchangeV1"
import { BigInt } from "@graphprotocol/graph-ts"
import { initDeal } from '../factory'
import { calculatePriceAndFee } from '../utils'
import { ContractAddress, ContractName, DealType } from "../enum"
import { Address } from "@graphprotocol/graph-ts/index"

export function handleBuy(event: Buy): void {
    let deal = initDeal(event, ContractName.EXCHANGE_V1)
    if (event.params.buyTokenId != BigInt.fromI32(0) && event.params.sellTokenId == BigInt.fromI32(0)){
        deal.type = DealType.BID
    }
    if (deal.type == DealType.ORDER) {
        deal.seller = event.params.owner
        deal.buyer = event.params.buyer
        deal.sellTokenId = event.params.sellTokenId
        deal.sellToken = event.params.sellToken
        deal.buyToken = event.params.buyToken
        deal.sellAmount = event.params.amount
        if (event.params.amount == BigInt.fromI32(0)){
            deal.buyAmount = event.params.amount
        } else {
            deal.buyAmount = event.params.buyValue.times(event.params.amount).div(event.params.sellValue)
        }
    } else if (deal.type == DealType.BID) {
        deal.seller = event.params.buyer
        deal.buyer = event.params.owner
        deal.sellTokenId = event.params.buyTokenId
        deal.sellToken = event.params.buyToken
        deal.buyToken = event.params.sellToken
        if (event.params.amount == BigInt.fromI32(0)){
            deal.sellAmount = event.params.amount
        } else {
            deal.sellAmount = event.params.buyValue.times(event.params.amount).div(event.params.sellValue)
        }
        deal.buyAmount = event.params.amount
    }

    if (deal.buyToken == Address.fromString(ContractAddress.ZERO)) {
        deal.buyToken = Address.fromString(ContractAddress.WETH9)
    }
    calculatePriceAndFee(deal)
    deal.save()
}

import { Buy } from "../../generated/TokenSale/TokenSale"
import { Address, BigInt } from "@graphprotocol/graph-ts/index"
import { initDeal } from '../factory'
import { calculatePriceAndFee } from '../utils'
import {ContractAddress, ContractName } from "../enum"

export function handleBuy(event: Buy): void {
    let deal = initDeal(event, ContractName.TOKEN_SALE)
    deal.seller = event.params.seller
    deal.buyer = event.params.buyer
    deal.sellTokenId = event.params.tokenId
    deal.sellToken = event.params.token
    deal.buyToken = Address.fromString(ContractAddress.WETH9)
    deal.sellAmount = BigInt.fromI32(1)
    deal.buyAmount = event.params.price
    calculatePriceAndFee(deal)
    deal.save()
}

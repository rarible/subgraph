import { Buy } from "../../generated/ERC721SaleV1/ERC721SaleV1"
import { Address, BigInt } from "@graphprotocol/graph-ts/index"
import { initDeal } from '../factory'
import { calculatePriceAndFee } from '../utils'
import { ContractAddress, ContractName } from "../enum"

export function handleBuy(event: Buy): void {
    let deal = initDeal(event, ContractName.ERC_721_SALE_V1)
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

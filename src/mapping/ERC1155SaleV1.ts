import { Buy } from "../../generated/ERC1155SaleV1/ERC1155SaleV1"
import { initDeal } from '../factory'
import { calculatePriceAndFee } from '../utils'
import { ContractAddress, ContractName } from "../enum"
import { Address } from "@graphprotocol/graph-ts/index"

export function handleBuy(event: Buy): void {
    let deal = initDeal(event, ContractName.ERC_1155_SALE_V1)
    deal.seller = event.params.owner
    deal.buyer = event.params.buyer
    deal.sellTokenId = event.params.tokenId
    deal.sellToken = event.params.token
    deal.buyToken = Address.fromString(ContractAddress.WETH9)
    deal.sellAmount = event.params.value
    deal.buyAmount = event.params.value.times(event.params.price)
    calculatePriceAndFee(deal)
    deal.save()
}


import { BigInt } from "@graphprotocol/graph-ts"
import {
  ExchangeV1,
  Buy,
  Cancel,
  OwnershipTransferred
} from "../generated/ExchangeV1/ExchangeV1"
import { ExampleEntity } from "../generated/schema"

export function handleBuy(event: Buy): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.sellToken = event.params.sellToken
  entity.sellTokenId = event.params.sellTokenId

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.beneficiary(...)
  // - contract.buyerFeeSigner(...)
  // - contract.erc20TransferProxy(...)
  // - contract.isOwner(...)
  // - contract.ordersHolder(...)
  // - contract.owner(...)
  // - contract.prepareBuyerFeeMessage(...)
  // - contract.prepareMessage(...)
  // - contract.state(...)
  // - contract.transferProxy(...)
  // - contract.transferProxyForDeprecated(...)
}

export function handleCancel(event: Cancel): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

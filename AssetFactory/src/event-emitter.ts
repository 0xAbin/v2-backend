import {
  EventLog as EventLogEvent,
  EventLog1 as EventLog1Event,
  EventLog2 as EventLog2Event
} from "../generated/EventEmitter/EventEmitter"
import { EventLog, EventLog1, EventLog2 } from "../generated/schema"
import { Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  EventLogEventDataAddressItemsItemsStruct,
  EventLogEventDataAddressItemsArrayItemsStruct,
  EventLogEventDataUintItemsItemsStruct,
  EventLogEventDataUintItemsArrayItemsStruct,
  EventLogEventDataIntItemsItemsStruct,
  EventLogEventDataIntItemsArrayItemsStruct,
  EventLogEventDataBoolItemsItemsStruct,
  EventLogEventDataBoolItemsArrayItemsStruct,
  EventLogEventDataBytes32ItemsItemsStruct,
  EventLogEventDataBytes32ItemsArrayItemsStruct,
  EventLogEventDataBytesItemsItemsStruct,
  EventLogEventDataBytesItemsArrayItemsStruct,
  EventLogEventDataStringItemsItemsStruct,
  EventLogEventDataStringItemsArrayItemsStruct
} from "../generated/EventEmitter/EventEmitter"

// Function to handle conversion of event params to string
function bytesToString(bytes: Bytes): string {
  return bytes.toHex()
}

// Function to extract Address from a structured type
function extractAddressesFromStruct(struct: EventLogEventDataAddressItemsArrayItemsStruct[]): Address[] {
  let addressArray: Address[] = []
  for (let i = 0; i < struct.length; i++) {
    addressArray = addressArray.concat(struct[i].value)
  }
  return addressArray
}

// Function to extract BigInt from a structured type
function extractBigIntFromStruct(struct: EventLogEventDataUintItemsArrayItemsStruct[]): BigInt[] {
  let bigIntArray: BigInt[] = []
  for (let i = 0; i < struct.length; i++) {
    bigIntArray = bigIntArray.concat(struct[i].value)
  }
  return bigIntArray
}

// Function to extract Bytes from a structured type
function extractBytesFromStruct(struct: EventLogEventDataBytes32ItemsArrayItemsStruct[]): Bytes[] {
  let bytesArray: Bytes[] = []
  for (let i = 0; i < struct.length; i++) {
    bytesArray = bytesArray.concat(struct[i].value)
  }
  return bytesArray
}

// Function to extract string from a structured type
function extractStringFromStruct(struct: EventLogEventDataStringItemsArrayItemsStruct[]): string[] {
  let stringArray: string[] = []
  for (let i = 0; i < struct.length; i++) {
    stringArray = stringArray.concat(struct[i].value)
  }
  return stringArray
}

// Function to convert BigInt to Bytes
function bigIntToBytesArray(bigIntArray: BigInt[]): Bytes[] {
  return bigIntArray.map(bigInt => Bytes.fromHexString(bigInt.toHexString()) as Bytes)
}

// Function to convert string[] to Bytes[]
function stringArrayToBytesArray(stringArray: string[]): Bytes[] {
  return stringArray.map(str => Bytes.fromUTF8(str))
}

// Function to flatten an array of arrays
function flatten<T>(array: T[][]): T[] {
  let flattenedArray: T[] = []
  for (let i = 0; i < array.length; i++) {
    flattenedArray = flattenedArray.concat(array[i])
  }
  return flattenedArray
}

export function handleEventLog(event: EventLogEvent): void {
  let entity = new EventLog(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.msgSender = event.params.msgSender
  entity.eventName = event.params.eventName
  entity.eventNameHash = bytesToString(event.params.eventNameHash)
  entity.eventData_addressItems_items = event.params.eventData.addressItems.items.map(item => item.value)
  entity.eventData_addressItems_arrayItems = extractAddressesFromStruct(event.params.eventData.addressItems.arrayItems)
  entity.eventData_uintItems_items = bigIntToBytesArray(event.params.eventData.uintItems.items.map(item => item.value))
  entity.eventData_uintItems_arrayItems = bigIntToBytesArray(extractBigIntFromStruct(event.params.eventData.uintItems.arrayItems))
  entity.eventData_intItems_items = bigIntToBytesArray(event.params.eventData.intItems.items.map(item => item.value))
  entity.eventData_intItems_arrayItems = bigIntToBytesArray(extractBigIntFromStruct(event.params.eventData.intItems.arrayItems))
  entity.eventData_boolItems_items = event.params.eventData.boolItems.items.map(item => Bytes.fromI32(item.value ? 1 : 0))
  entity.eventData_boolItems_arrayItems = event.params.eventData.boolItems.arrayItems.map(item => Bytes.fromI32(item.value ? 1 : 0))
  entity.eventData_bytes32Items_items = event.params.eventData.bytes32Items.items.map(item => item.value)
  entity.eventData_bytes32Items_arrayItems = extractBytesFromStruct(event.params.eventData.bytes32Items.arrayItems)
  entity.eventData_bytesItems_items = event.params.eventData.bytesItems.items.map(item => item.value)
  entity.eventData_bytesItems_arrayItems = extractBytesFromStruct(event.params.eventData.bytesItems.arrayItems)
  entity.eventData_stringItems_items = event.params.eventData.stringItems.items.map(item => Bytes.fromUTF8(item.value))
  entity.eventData_stringItems_arrayItems = flatten(event.params.eventData.stringItems.arrayItems.map((item: EventLogEventDataStringItemsArrayItemsStruct) => stringArrayToBytesArray(item.value)))

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEventLog1(event: EventLog1Event): void {
  let entity = new EventLog1(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.msgSender = event.params.msgSender
  entity.eventName = event.params.eventName
  entity.eventNameHash = bytesToString(event.params.eventNameHash)
  entity.topic1 = event.params.topic1
  entity.eventData_addressItems_items = event.params.eventData.addressItems.items.map(item => item.value)
  entity.eventData_addressItems_arrayItems = extractAddressesFromStruct(event.params.eventData.addressItems.arrayItems)
  entity.eventData_uintItems_items = bigIntToBytesArray(event.params.eventData.uintItems.items.map(item => item.value))
  entity.eventData_uintItems_arrayItems = bigIntToBytesArray(extractBigIntFromStruct(event.params.eventData.uintItems.arrayItems))
  entity.eventData_intItems_items = bigIntToBytesArray(event.params.eventData.intItems.items.map(item => item.value))
  entity.eventData_intItems_arrayItems = bigIntToBytesArray(extractBigIntFromStruct(event.params.eventData.intItems.arrayItems))
  entity.eventData_boolItems_items = event.params.eventData.boolItems.items.map(item => Bytes.fromI32(item.value ? 1 : 0))
  entity.eventData_boolItems_arrayItems = event.params.eventData.boolItems.arrayItems.map(item => Bytes.fromI32(item.value ? 1 : 0))
  entity.eventData_bytes32Items_items = event.params.eventData.bytes32Items.items.map(item => item.value)
  entity.eventData_bytes32Items_arrayItems = extractBytesFromStruct(event.params.eventData.bytes32Items.arrayItems)
  entity.eventData_bytesItems_items = event.params.eventData.bytesItems.items.map(item => item.value)
  entity.eventData_bytesItems_arrayItems = extractBytesFromStruct(event.params.eventData.bytesItems.arrayItems)
  entity.eventData_stringItems_items = event.params.eventData.stringItems.items.map(item => Bytes.fromUTF8(item.value))
  entity.eventData_stringItems_arrayItems = flatten(event.params.eventData.stringItems.arrayItems.map((item: EventLogEventDataStringItemsArrayItemsStruct) => stringArrayToBytesArray(item.value)))

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEventLog2(event: EventLog2Event): void {
  let entity = new EventLog2(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.msgSender = event.params.msgSender
  entity.eventName = event.params.eventName
  entity.eventNameHash = bytesToString(event.params.eventNameHash)
  entity.topic1 = event.params.topic1
  entity.topic2 = event.params.topic2
  entity.eventData_addressItems_items = event.params.eventData.addressItems.items.map(item => item.value)
  entity.eventData_addressItems_arrayItems = extractAddressesFromStruct(event.params.eventData.addressItems.arrayItems)
  entity.eventData_uintItems_items = bigIntToBytesArray(event.params.eventData.uintItems.items.map(item => item.value))
  entity.eventData_uintItems_arrayItems = bigIntToBytesArray(extractBigIntFromStruct(event.params.eventData.uintItems.arrayItems))
  entity.eventData_intItems_items = bigIntToBytesArray(event.params.eventData.intItems.items.map(item => item.value))
  entity.eventData_intItems_arrayItems = bigIntToBytesArray(extractBigIntFromStruct(event.params.eventData.intItems.arrayItems))
  entity.eventData_boolItems_items = event.params.eventData.boolItems.items.map(item => Bytes.fromI32(item.value ? 1 : 0))
  entity.eventData_boolItems_arrayItems = event.params.eventData.boolItems.arrayItems.map(item => Bytes.fromI32(item.value ? 1 : 0))
  entity.eventData_bytes32Items_items = event.params.eventData.bytes32Items.items.map(item => item.value)
  entity.eventData_bytes32Items_arrayItems = extractBytesFromStruct(event.params.eventData.bytes32Items.arrayItems)
  entity.eventData_bytesItems_items = event.params.eventData.bytesItems.items.map(item => item.value)
  entity.eventData_bytesItems_arrayItems = extractBytesFromStruct(event.params.eventData.bytesItems.arrayItems)
  entity.eventData_stringItems_items = event.params.eventData.stringItems.items.map(item => Bytes.fromUTF8(item.value))
  entity.eventData_stringItems_arrayItems = flatten(event.params.eventData.stringItems.arrayItems.map((item: EventLogEventDataStringItemsArrayItemsStruct) => stringArrayToBytesArray(item.value)))

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

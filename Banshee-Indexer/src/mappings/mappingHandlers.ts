import { TicketMinted, ContentUnlocked } from "../types";
import { ReceiptRecorded } from "../types";
import { Ticket, UnlockEvent, Receipt } from "../types";

export async function handleTicketMint(event: TicketMinted): Promise<void> {

  let entity = new Ticket(event.transaction.hash.toString());

  entity.ticketId = event.params.ticketId;
  entity.buyer = event.params.buyer.toHex();
  entity.artist = event.params.artist.toHex();
  entity.identityHash = event.params.identityHash.toHex();
  entity.mintedAt = event.block.timestamp;

  await entity.save();
}

export async function handleUnlock(event: ContentUnlocked): Promise<void> {

  let entity = new UnlockEvent(event.transaction.hash.toString());

  entity.ticketId = event.params.ticketId;
  entity.user = event.params.user.toHex();
  entity.timestamp = event.block.timestamp;

  await entity.save();
}

export async function handleReceipt(event: ReceiptRecorded): Promise<void> {

  let entity = new Receipt(event.transaction.hash.toString());

  entity.artist = event.params.artist.toHex();
  entity.fan = event.params.fan.toHex();
  entity.chunks = event.params.chunks;
  entity.timestamp = event.block.timestamp;

  await entity.save();
}

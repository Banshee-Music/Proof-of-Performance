// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type TicketProps = Omit<Ticket, NonNullable<FunctionPropertyNames<Ticket>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatTicketProps = Omit<TicketProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Ticket implements CompatEntity {

    constructor(
        
        id: string,
        ticketId: bigint,
        buyer: string,
        artist: string,
        identityHash: string,
        mintedAt: bigint,
    ) {
        this.id = id;
        this.ticketId = ticketId;
        this.buyer = buyer;
        this.artist = artist;
        this.identityHash = identityHash;
        this.mintedAt = mintedAt;
        
    }

    public id: string;
    public ticketId: bigint;
    public buyer: string;
    public artist: string;
    public identityHash: string;
    public mintedAt: bigint;
    

    get _name(): string {
        return 'Ticket';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Ticket entity without an ID");
        await store.set('Ticket', id.toString(), this as unknown as CompatTicketProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Ticket entity without an ID");
        await store.remove('Ticket', id.toString());
    }

    static async get(id: string): Promise<Ticket | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Ticket entity without an ID");
        const record = await store.get('Ticket', id.toString());
        if (record) {
            return this.create(record as unknown as TicketProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<TicketProps>[], options: GetOptions<TicketProps>): Promise<Ticket[]> {
        const records = await store.getByFields<CompatTicketProps>('Ticket', filter  as unknown as FieldsExpression<CompatTicketProps>[], options as unknown as GetOptions<CompatTicketProps>);
        return records.map(record => this.create(record as unknown as TicketProps));
    }

    static create(record: TicketProps): Ticket {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.ticketId,
            record.buyer,
            record.artist,
            record.identityHash,
            record.mintedAt,
        );
        Object.assign(entity,record);
        return entity;
    }
}

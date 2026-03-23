// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type UnlockEventProps = Omit<UnlockEvent, NonNullable<FunctionPropertyNames<UnlockEvent>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatUnlockEventProps = Omit<UnlockEventProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class UnlockEvent implements CompatEntity {

    constructor(
        
        id: string,
        ticketId: bigint,
        user: string,
        timestamp: bigint,
    ) {
        this.id = id;
        this.ticketId = ticketId;
        this.user = user;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public ticketId: bigint;
    public user: string;
    public timestamp: bigint;
    

    get _name(): string {
        return 'UnlockEvent';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save UnlockEvent entity without an ID");
        await store.set('UnlockEvent', id.toString(), this as unknown as CompatUnlockEventProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove UnlockEvent entity without an ID");
        await store.remove('UnlockEvent', id.toString());
    }

    static async get(id: string): Promise<UnlockEvent | undefined> {
        assert((id !== null && id !== undefined), "Cannot get UnlockEvent entity without an ID");
        const record = await store.get('UnlockEvent', id.toString());
        if (record) {
            return this.create(record as unknown as UnlockEventProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<UnlockEventProps>[], options: GetOptions<UnlockEventProps>): Promise<UnlockEvent[]> {
        const records = await store.getByFields<CompatUnlockEventProps>('UnlockEvent', filter  as unknown as FieldsExpression<CompatUnlockEventProps>[], options as unknown as GetOptions<CompatUnlockEventProps>);
        return records.map(record => this.create(record as unknown as UnlockEventProps));
    }

    static create(record: UnlockEventProps): UnlockEvent {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.ticketId,
            record.user,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}

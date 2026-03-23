// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type ReceiptProps = Omit<Receipt, NonNullable<FunctionPropertyNames<Receipt>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatReceiptProps = Omit<ReceiptProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Receipt implements CompatEntity {

    constructor(
        
        id: string,
        artist: string,
        fan: string,
        chunks: bigint,
        timestamp: bigint,
    ) {
        this.id = id;
        this.artist = artist;
        this.fan = fan;
        this.chunks = chunks;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public artist: string;
    public fan: string;
    public chunks: bigint;
    public timestamp: bigint;
    

    get _name(): string {
        return 'Receipt';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Receipt entity without an ID");
        await store.set('Receipt', id.toString(), this as unknown as CompatReceiptProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Receipt entity without an ID");
        await store.remove('Receipt', id.toString());
    }

    static async get(id: string): Promise<Receipt | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Receipt entity without an ID");
        const record = await store.get('Receipt', id.toString());
        if (record) {
            return this.create(record as unknown as ReceiptProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<ReceiptProps>[], options: GetOptions<ReceiptProps>): Promise<Receipt[]> {
        const records = await store.getByFields<CompatReceiptProps>('Receipt', filter  as unknown as FieldsExpression<CompatReceiptProps>[], options as unknown as GetOptions<CompatReceiptProps>);
        return records.map(record => this.create(record as unknown as ReceiptProps));
    }

    static create(record: ReceiptProps): Receipt {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.artist,
            record.fan,
            record.chunks,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}

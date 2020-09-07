import { model, Model, Schema, Document } from "mongoose";
import moment from 'moment';
import {IProduct} from "./product.model";

export enum TRANSACTION_STATUS {
    PENDING = 'Pending',
    DONE = 'Done',
}

interface ITransactionProduct extends IProduct {
    vat: number;
    importVat: number;
    quantity: number;
}

export interface ITransaction extends Document {
    products: ITransactionProduct[],
    status: string,
    createdAt: Date,
}

const TransactionSchema: Schema = new Schema({
    products: { type: Array, required: true },
    status: { type: String, default: TRANSACTION_STATUS.PENDING },
    expiry: { type: String, default: moment().add(1, 'hour').toDate() },
    createdAt: { type: String, default: Date.now() },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

TransactionSchema.virtual('expired').get(() => {
    return moment().subtract(moment(this.createdAt).add(1, 'hour')) <= 0;
});

const Transaction: Model<ITransaction> = model("Transaction", TransactionSchema);
export default Transaction;
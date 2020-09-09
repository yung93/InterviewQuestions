import { model, Model, Schema, Document } from "mongoose";
import moment from 'moment';
import {IProduct, IProductWithVat} from "./product.model";

export enum TRANSACTION_STATUS {
    PENDING = 'Pending',
    DONE = 'Done',
}

interface ITransactionProduct extends IProductWithVat {
    quantity: number;
    subTotal: number;
}

export interface ITransaction extends Document {
    products: ITransactionProduct[],
    subTotal: number,
    taxTotal: number,
    status?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

const TransactionSchema: Schema = new Schema({
    products: { type: Array, required: true },
    subTotal: { type: Number, required: true },
    taxTotal: { type: Number, required: true },
    status: { type: String, default: TRANSACTION_STATUS.PENDING },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: { createdAt: true, updatedAt: true } });

TransactionSchema.virtual('expired').get(function(this: ITransaction) {
    return moment().diff(moment(this.createdAt), 'hour', true) > 1;
});

TransactionSchema.virtual('total').get(function(this: ITransaction) {
    return this.subTotal + this.taxTotal;
});

const Transaction: Model<ITransaction> = model("Transaction", TransactionSchema);
export default Transaction;
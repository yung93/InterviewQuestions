import { model, Model, Schema, Document } from "mongoose";

export enum TAX_RATE {
    VAT = 0.1,
    IMPORT_VAT = 0.05,
}

export enum COMMODITY_CODE {
    '01' = 'Books',
    '02' = 'CD/DVDs',
    '03' = 'Foods',
    '04' = 'Medical Products',
    '05' = 'Beauty',
};

export const exemptCodes = ['01', '03', '04'];

export interface IProduct extends Document {
    SKU: string;
    name: string;
    price: number;
    imageUrl: string,
    category: string,
    commodityCode: string,
    imported: boolean,
}

const ProductSchema: Schema = new Schema({
    SKU: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    category: { type: String },
    commodityCode: { type: String, required: true },
    imported: { type: Boolean },
});

const Product: Model<IProduct> = model("Product", ProductSchema);
export default Product;
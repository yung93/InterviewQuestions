import { model, Model, Schema, Document } from "mongoose";

const getNearest005 = (num: number) => {
    return Math.round(num * 20) / 20.0;
};

enum TAX_RATE {
    VAT = 0.1,
    IMPORT_VAT = 0.05,
}

enum COMMODITY_CODE {
    '01' = 'Books',
    '02' = 'CD/DVDs',
    '03' = 'Foods',
    '04' = 'Medical Products',
    '05' = 'Beauty',
};

const exemptCodes = ['01', '03', '04'];

export interface IProduct extends Document{
    SKU: string;
    name: string;
    price: number;
    imageUrl: string,
    category: string,
    commodityCode: string,
    imported: boolean,
}

export interface IProductWithVat extends IProduct {
    vat: number,
    importVat: number,
}

const ProductSchema: Schema = new Schema({
    SKU: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    category: { type: String },
    commodityCode: { type: String, required: true },
    imported: { type: Boolean },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

ProductSchema.virtual('vat')
    .get(function (this: IProduct) {
        const { price, commodityCode } = this;
        return getNearest005(price * (exemptCodes.includes(commodityCode) ? 0 : TAX_RATE.VAT));
    });

ProductSchema.virtual('importVat')
    .get(function (this: IProduct) {
        const { price, imported } = this;
        return getNearest005(price * (imported ? TAX_RATE.IMPORT_VAT : 0));
    });

const Product: Model<IProductWithVat> = model("Product", ProductSchema);
export default Product;
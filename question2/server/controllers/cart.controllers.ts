import { Request, Response, NextFunction } from 'express';
import Product from '../models/product.model';
import {IProduct, exemptCodes, TAX_RATE } from "../models/product.model";
import Transaction from "../models/transaction.model";

export const getProductsBySkus = async (req: Request, res: Response, next: NextFunction) => {
    const { skus } = req.body;
    try {
        const products: IProduct[] = await Product.aggregate([
            { $match: { SKU: { $in: skus } } },
            {
                $project: {
                    SKU: 1,
                    name: 1,
                    imageUrl: 1,
                    price: 1,
                    vat: { $round: [{ $multiply: ['$price', { $cond: [{ $in: [ '$commodityCode', exemptCodes ] }, 0, TAX_RATE.VAT] }] }, 3] },
                    importVat: { $round: [{ $multiply: ['$price', { $cond: ['$imported', TAX_RATE.IMPORT_VAT, 0] }] }, 3] },
                }
            }
        ]);
        res.json(products);
    } catch (e) {
        next(e);
    }
};

export const getTotal = async (req: Request, res: Response, next: NextFunction) => {
    const { products = [] } = req.body;
    try {
        const transactionID: string = await Transaction.aggregate([
            { $match: { SKU: { $in: products } } },
            {
                $project: {
                    SKU: 1,
                    name: 1,
                    imageUrl: 1,
                    price: 1,
                    vat: { $round: [{ $multiply: ['$price', { $cond: [{ $in: [ '$commodityCode', exemptCodes ] }, 0, TAX_RATE.VAT] }] }, 3] },
                    importVat: { $round: [{ $multiply: ['$price', { $cond: ['$imported', TAX_RATE.IMPORT_VAT, 0] }] }, 3] },
                }
            }
        ]);
        res.json({ transactionID });
    } catch (e) {
        next(e);
    }
};


export const checkout = async (req: Request, res: Response, next: NextFunction) => {
    const { transactionID } = req.body;
    try {
        const products: IProduct[] = await Product.aggregate([
            { $match: { SKU: { $in: skus } } },
            {
                $project: {
                    SKU: 1,
                    name: 1,
                    imageUrl: 1,
                    price: 1,
                    vat: { $round: [{ $multiply: ['$price', { $cond: [{ $in: [ '$commodityCode', exemptCodes ] }, 0, TAX_RATE.VAT] }] }, 3] },
                    importVat: { $round: [{ $multiply: ['$price', { $cond: ['$imported', TAX_RATE.IMPORT_VAT, 0] }] }, 3] },
                }
            }
        ]);
        res.json(products);
    } catch (e) {
        next(e);
    }
};


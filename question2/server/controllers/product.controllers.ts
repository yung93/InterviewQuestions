import { Request, Response, NextFunction } from 'express';
import Product from '../models/product.model';
import {IProduct, exemptCodes, TAX_RATE } from "../models/product.model";

export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products: IProduct[] = await Product.aggregate([
            { $match: {} },
            {
                $project: {
                    SKU: 1,
                    name: 1,
                    imageUrl: 1,
                    category: 1,
                    price: 1,
                    vat: 1,
                    vat: { $round: [{ $multiply: ['$price', { $cond: [{ $in: [ '$commodityCode', exemptCodes ] }, 0, TAX_RATE.VAT] }] }, 3] },
                    importVat: { $round: [{ $multiply: ['$price', { $cond: ['$imported', TAX_RATE.IMPORT_VAT, 0] }] }, 3] },
                }
            },
            {
                $group: {
                    _id: '$category',
                    products: {
                        $push: { $arrayToObject: [[
                            ['SKU', '$SKU'],
                            ['name', '$name'],
                            ['imageUrl', '$imageUrl'],
                            ['price', '$price'],
                            ['vat', '$vat'],
                            ['importVat', '$importVat'],
                        ]] }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: '$_id',
                    products: 1,
                }
            },
            {
                $sort: { 'category': 1 }
            }
        ]);
        res.json(products);
    } catch (e) {
        next(e);
    }
};


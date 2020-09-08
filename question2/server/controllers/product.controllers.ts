import { Request, Response, NextFunction } from 'express';
import Product, {IProductWithVat} from '../models/product.model';
import { IProduct } from "../models/product.model";

export const getProductsGroupByCategory = async (req: Request, res: Response, next: NextFunction) => {
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

export const getProductsBySkus = async (req: Request, res: Response, next: NextFunction) => {
    const { skus } = req.body;
    try {
        const products: IProductWithVat[] = await Product.find({
            SKU: { $in: skus }
        });
        res.json(products);
    } catch (e) {
        next(e);
    }
};


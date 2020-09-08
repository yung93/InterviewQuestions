import { Request, Response, NextFunction } from 'express';
import Product, {IProductWithVat} from '../models/product.model';
import Transaction, {ITransaction, TRANSACTION_STATUS} from "../models/transaction.model";

export const getTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const { transactionID } = req.params;
    try {
        const transaction: ITransaction | null = await Transaction.findById(transactionID);
        res.json(transaction);
    } catch (e) {
        next(e);
    }
};

export const getTotal = async (req: Request, res: Response, next: NextFunction) => {
    const { products = [] } = req.body;
    const productQuantityMap = new Map<string, number>();
    let subTotal = 0;
    let taxTotal = 0;
    products.forEach((product: { SKU: string, quantity: number }) => {
        productQuantityMap.set(product.SKU, product.quantity);
    });
    try {
        const matchProducts: IProductWithVat[] = await Product.find({
            SKU: { $in: products.map((product: { SKU: string, quantity: number }) => product.SKU )}
        });
        const productsWithSubTotal = matchProducts.map((product: IProductWithVat) => {
            const { SKU, price, vat = 0, importVat = 0 } = product;
            const quantity = productQuantityMap.get(SKU) || 0;
            const productSum: number = price * quantity;
            const productTax: number = (vat + importVat) * quantity;
            subTotal += productSum;
            taxTotal += productTax;
            return {
                ...product.toObject(),
                quantity,
                subTotal: (productSum + productTax).toFixed(2),
            }
        });
        const transaction: ITransaction = await Transaction.create({
            products: productsWithSubTotal,
            subTotal,
            taxTotal
        });
        res.json(transaction);
    } catch (e) {
        next(e);
    }
};


export const checkout = async (req: Request, res: Response, next: NextFunction) => {
    const { transactionID } = req.params;
    try {
        const transaction: ITransaction | null = await Transaction.findByIdAndUpdate(transactionID, {
            status: TRANSACTION_STATUS.DONE
        }, { new: true });
        res.json(transaction);
    } catch (e) {
        next(e);
    }
};


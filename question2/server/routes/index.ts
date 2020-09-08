import { Application, Request, Response, NextFunction } from "express";
import productsRouter from './product.router';
import transactionRouter from './transaction.router';
import { HttpException } from "../types/exceptions";

const routes = (app: Application) => {
    // api routes =========================================================
    app.use('/api/product', productsRouter);
    app.use('/api/transaction', transactionRouter);

    // Error handling middleware
    app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message || 'Something went wrong';
        console.error(err);
        res.status(status).json({ status, message, ...err }).end();
    });
};

export default routes;
module.exports = routes;
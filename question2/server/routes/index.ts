import { Application, Request, Response, NextFunction } from "express";
import productsRouter from './products.router';
import cartRouter from './cart.router';
import { HttpException } from "../types/exceptions";

const routes = function (app: Application) {
    // api routes =========================================================
    app.use('/api/product', productsRouter);
    app.use('/api/cart', cartRouter);

    // Error handling middleware
    app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message || 'Something went wrong';
        console.error(err);
        res.status(status).json(err).end();
    });
};

export default routes;
export enum TRANSACTION_STATUS {
    PENDING = 'Pending',
    DONE = 'Done',
}

export interface IProduct {
    SKU: string,
    name: string,
    imageUrl: string,
    price: number,
}

export interface ICategorisedProducts{
    products: IProduct[],
    category: string,
}

export interface ICartProduct extends IProduct{
    quantity: number,
    vat: number,
    importVat: number,
}

export interface ITransaction{
    id: string,
    products: ICartProduct[],
    expired: boolean,
    status: TRANSACTION_STATUS,
    subTotal: number,
    taxTotal: number,
    total: number,
}
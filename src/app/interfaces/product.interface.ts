export interface IProduct {
    id: number,
    imgUrl: string,
    title: string,
    quantity: number,
    price: number,
    description: string,
    status: string,
    viewNumber: number,
    buyNumber: number
}

export enum ProductStatus {
    OPEN = "Selling",
    CLOSE = "Out of stock"
}
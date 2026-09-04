import mongoose from "mongoose";
export interface ProductReadModel {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ProductReadModel: mongoose.Model<ProductReadModel, {}, {}, {}, mongoose.Document<unknown, {}, ProductReadModel, {}, mongoose.DefaultSchemaOptions> & ProductReadModel & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, ProductReadModel>;

import mongoose, { Schema } from "mongoose";

export interface ProductReadModel {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

const productReadSchema = new Schema<ProductReadModel>(
    {
        _id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        updatedAt: {
            type: Date,
            required: true,
        },
    },
    {
        versionKey: false,
        collection: "products",
    }
);

export const ProductReadModel = mongoose.model<ProductReadModel>(
    "ProductReadModel",
    productReadSchema
);
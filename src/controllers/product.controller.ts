import {Request, Response} from "express";
import Product, { IProduct } from '../models/product.model';


export async function createProduct(req:Request, res:Response):Promise<void> {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
        return
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
        return;
    }
}

export async function getProducts(req:Request, res:Response):Promise<void> {
    try {
        const products:IProduct[] = await Product.find();
        res.status(200).json(products);
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
}

export async function getProduct(req:Request, res:Response):Promise<void> {
    try {
        const productId:string = `${req.params.id}`;
        const product:(IProduct | null) = await Product.findById(productId);

        if(!product){
            res.status(404).json({message:"Product not found"});
        }

        res.status(200).json(product);
        return;
    } catch (error) {
        res.status(500).json({message:"Error fetching products", error});
        return;    
    }

}

export async function updateProduct(req:Request, res:Response):Promise<void> {
    try {
        const productId:string = `${req.params.id}`;
        const product:IProduct | null = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        if(!product){
            res.status(404).json({message:"Product not found and cannot be updated"});
            return;
        }

        res.status(200).json(product);
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
        return;
    }
}


export async function deleteProduct(req:Request, res:Response):Promise<void> {
    try {
        const productId:string = `${req.params.id}`;
        const product:IProduct | null = await Product.findByIdAndDelete(productId);
        if(!product){
            res.status(404).json({message:"Product not found and cannot be deleted"});
            return;
        }
        res.status(200).json({message:"Product deleted successfully"});
        return;
    } catch (error) {
        res.status(500).json({message:"Error deleting product", error});
        return;
    }
}

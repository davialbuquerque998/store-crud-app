import mongoose, {Document, Schema} from "mongoose";

export interface IProduct extends Document {
    productName:string,
    productPriceInUSD:number,
    isAvailable:boolean
}

const ProductSchema:Schema = new Schema<IProduct>({
    productName:{
        type:String,
        required:true
    },
    productPriceInUSD:{
        type:Number,
        required:true
    },
    isAvailable:{
        type:Boolean,
        required:true
    }
});

export default mongoose.model<IProduct>("Product", ProductSchema);
//const ProductSchema = require("../models/products.js");
import ProductSchema from "../models/products.js";

export const getProducts = async(req,res)=> {
  
    try{
        //getting data from db
    const products = await ProductSchema.find({})

    if(products){
        res.json(products)
    }

    } catch(error){
        console.log(error)
    }
};

export const getProduct = async(req,res)=> {
  
    try{
        //getting data from db
    const products = await questionModel.findById(req.params.id)

    if(questions){
        res.json(products)
    }

    } catch(error){
        console.log(error)
    }
};

export const createProduct = async(req,res)=> {
    try{
       const product = new ProductSchema({
        name : req.body.name,
        productInfo : req.body.productInfo,
        color : req.body.color,
        size : req.body.size,
        image : req.body.image,
        price : req.body.price,
       })

       const createData = await product.save();

       if(createData){
           res.send(createData);
       }
    } catch(error){
        console.log(error)
    }
};

export const updateProduct = async(req,res)=> {
    try{
        // update a question

        const product = await ProductSchema.findByIdAndUpdate(req.params.id, req.body)
        
        if(question){
            res.send("Updated Successfully")
        }

    } catch(error){
        console.log(error)
    }
};

export const deleteProduct = async(req,res)=> {
    try {
        // Delete a Question

        const product = await ProductSchema.findByIdAndDelete(req.params.id)

        if(question){
            res.send("Deleted Successfully")
        }
    } catch (error) {
        console.log(error)
    }
};

//module.exports = {getProducts, createProduct, updateProduct, deleteProduct, getProduct}





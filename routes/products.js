// const express = require('express');
// const {getProducts, createProduct, updateProduct, deleteProduct, getProduct
// } = require("../controllers/product.js");
// const {verifyToken, verifyUser, verifyAdmin} = require("../utils/verifyToken.js");
// const router = express.Router();

import express from "express";
import {getProducts, createProduct, updateProduct, deleteProduct, getProduct} from "../controllers/product.js";
import {verifyToken, verifyUser, verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();


//CREATE
router.post("/", verifyAdmin, createProduct);

//UPDATE
router.put("/:id", verifyAdmin, updateProduct);
//DELETE
router.delete("/:id", verifyAdmin, deleteProduct);
//GET
router.get("/find/:id", getProduct);
//GET ALL

router.get("/", getProducts);

// module.exports = router;
export default router;

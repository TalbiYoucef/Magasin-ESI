const router = require('express').Router()
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct, removeProductFromBranch, assignProductToBranch, updateProductQuantityInCommand,deleteProductFromPurchaseOrder } = require('../Controllers/ProductController')
router
.get('/', getAllProducts)//done
.post('/', createProduct)//done 
.get('/:id', getProductById)//done
.put('/:id', updateProduct) // here you can either push all the information at once (quantity product name etc in the update product or u can seperate them to different routes) // done
.delete('/:id', deleteProduct)//done
.delete('/:id/branch', removeProductFromBranch)//done
.post('/:id/branch', assignProductToBranch )//done
.put('/:id/command', updateProductQuantityInCommand)//done
.delete('/:id/command', deleteProductFromPurchaseOrder)//done

module.exports=router
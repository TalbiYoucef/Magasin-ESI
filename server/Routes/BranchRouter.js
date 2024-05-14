const router = require('express').Router()
const { getBranches,getBranchById,createBranch,updateBranch,deleteBranch,assignBranchToChapter,removeBranchFromChapter,getBranchProducts, assignProductsToBranch } = require('../Controllers/BranchController')

router
.get('/', getBranches)
.get('/:id', getBranchById)
.post('/', createBranch)
.put('/:id', updateBranch)
.delete('/:id', deleteBranch)
.put('/:id/chapter/', assignBranchToChapter)
.delete('/:id/chapter/', removeBranchFromChapter)
.get('/:id/products', getBranchProducts)
.post('/:id/products', assignProductsToBranch)

module.exports= router
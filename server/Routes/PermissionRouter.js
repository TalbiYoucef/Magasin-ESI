const router = require('express').Router()
const { getAllPermissions, getPermissionById, updatePermissionName} = require('../Controllers/PermissionController')

router
.get('/', getAllPermissions)
.get('/:id', getPermissionById)
.put('/:id', updatePermissionName)

module.exports= router
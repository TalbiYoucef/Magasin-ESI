const router = require('express').Router()

const { createRole, getAllRoles, getRoleById, deleteRole, updateRoleName, assignPermissionToRole, removePermissionFromRole, getRolePermissions} = require('../Controllers/RoleController')

router
.get('/', getAllRoles)
.post('/', createRole)
.get('/:id', getRoleById)
.put('/:id', updateRoleName)
.delete('/:id', deleteRole)
.get('/:id/permissions/', getRolePermissions)
.put('/:id/permissions/', assignPermissionToRole)
.delete('/:id/permissions/', removePermissionFromRole);



module.exports= router
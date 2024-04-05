const router = require('express').Router()
const { getUsers, getUserById, deleteUser, updateUserProfile, getUserRoles, addRoleToUser, deleteRoleFromUser, updateUserRoles } = require('../Controllers/UserController')

router
.get('/', getUsers)
.get('/:id', getUserById)
.delete('/:id', deleteUser)
.put('/:id/editprofile', updateUserProfile)
.get('/:id/roles', getUserRoles)
.post('/:id/roles', addRoleToUser)
.put('/:id/roles',updateUserRoles)
.delete('/:id/roles/:role_id', deleteRoleFromUser)

module.exports= router
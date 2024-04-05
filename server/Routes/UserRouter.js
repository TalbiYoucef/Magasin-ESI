const router = require('express').Router()
const { getUsers, getUserById, deleteUser, updateUserProfile, getUserRoles, addRoleToUser, deleteRoleFromUser, updateUserRoles } = require('../Controllers/UserController')
const verifyAdmin =require('../Middlewares/VerifyAdmin')
router
.get('/',verifyAdmin, getUsers)
.get('/:id',getUserById)
.delete('/:id',verifyAdmin, deleteUser)
.put('/:id/editprofile', updateUserProfile)
.get('/:id/roles', getUserRoles)
.post('/:id/roles', addRoleToUser)
.put('/:id/roles',updateUserRoles)
.delete('/:id/roles/:role_id', deleteRoleFromUser)

module.exports= router
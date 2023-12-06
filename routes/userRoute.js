const express=require('express')
const router=express.Router()
const useController=require('../controllers/useController')
const validateToken = require('../middleware/validationTokenHandler')



router.post('/register',useController.register)
router.post('/login',useController.login)
router.get('/current',validateToken,useController.current)

module.exports=router
const router=require('express').Router()
const { Router } = require('express')
const cUser=require('../controlers/user.controler')
router.post('/reg',cUser.userinsert)
router.post('/login',cUser.logininsert)

module.exports = router
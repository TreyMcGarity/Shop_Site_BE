const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const user_db = require('../models/user-model')
const vendor_db = require('../models/ vendor-model')
const patron_db = require('../models/patron-model')

router.post('/register', async (req, res, next) => {
    try {
        
    } catch(err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        
    } catch(err) {
        next(err)
    }
})

router.post('/logout', async (req, res, next) => {
    try {
        
    } catch(err) {
        next(err)
    }
})
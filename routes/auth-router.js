const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const Users = require('../models/user-model')

const router = express.Router()

router.post('/register', async (req, res, next) => {
    try {
        
    } catch(err) {
        next(err)
    }
})
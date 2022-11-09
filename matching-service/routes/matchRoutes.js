const express = require('express')

const router = express.Router()

const { createMatch } = require('../controller/matchController')

router.post('/', createMatch)

module.exports = router

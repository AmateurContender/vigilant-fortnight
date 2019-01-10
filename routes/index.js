const express = require('express')
const SearchController = require('../controllers/SearchController')
const router = express.Router()

router.get('/health', (req, res) => res.status(200).send('OK'))
router.get('/', (req, res) => res.status(200).send('OK'))

router.get('/search', SearchController.search)

module.exports = router

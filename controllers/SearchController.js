const _ = require('lodash')
const SearchService = require('../services/SearchService')

module.exports.search = (req, res) => {
  const hotel = _.toLower(req.query.hotel)
  const city = _.toLower(req.query.city)
  const price = req.query.price
  const date = req.query.date
  const orderBy = req.query.orderBy

  const searchParams = {
    hotel, city, price, date, orderBy
  }

  return SearchService.search(searchParams)
  .then(data => res.status(200).send(data))
  .catch(e => res.status(500).send(e))
}

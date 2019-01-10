/*
  SearchService.js

  This service is where the primary logic rests.
  First the request is made then the response object is filtered based on which inputs are provided
  Then the response is ordered and returned
*/

const got = require('got')
const _ = require('lodash')
const moment = require('moment')

module.exports.search = ({hotel, city, price, date, orderBy}) => {
  return got('https://api.myjson.com/bins/tl0bp')
  .then(res => {
    const response = JSON.parse(res.body)
    const filteredResults = response.hotels.filter(result => {
      if (hotel) return _.includes(_.toLower(result.name), hotel)
      if (city) return _.includes(_.toLower(result.city), city)

      if (price) {
        const lowerPrice = parseInt(_.trim(_.split(price, ':')[0], '$'), 10)
        const upperPrice = parseInt(_.trim(_.split(price, ':')[1], '$'), 10)

        return (result.price >= lowerPrice && result.price <= upperPrice)
      }

      if (date) {
        const startDate = moment(_.split(date, ':')[0], 'DD-MM-YYYY')
        const endDate = moment(_.split(date, ':')[1], 'DD-MM-YYYY')

        result.availability = result.availability.filter(dates => {
          const availableStartDate = startDate.isAfter(moment(dates.from, 'DD-MM-YYYY'))
          const availableEndDate = endDate.isBefore(moment(dates.to, 'DD-MM-YYYY'))
          return (availableStartDate && availableEndDate)
        })

        if (result.availability.length > 0) return true
        else return false
      }

      return true
    })

    let results = filteredResults
    if (orderBy === 'price') results = _.orderBy(results, 'price')
    if (orderBy === 'hotel') results = _.orderBy(results, 'name')

    return Promise.resolve(results)
  })
}

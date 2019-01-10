/* eslint-env mocha */
const SearchService = require('../../services/SearchService')
const assert = require('assert')
const nock = require('nock')
const moment = require('moment')

describe('SearchService', () => {
  beforeEach(() => {})

  afterEach(() => {})

  describe('#search', () => {
    const response = { hotels: [{ name: 'Media One Hotel', price: 102.2, city: 'dubai', availability: [{ from: '10-10-2020', to: '15-10-2020' }, { from: '25-10-2020', to: '15-11-2020' }, { from: '10-12-2020', to: '15-12-2020' }] }, { name: 'Rotana Hotel', price: 80.6, city: 'cairo', availability: [{ from: '10-10-2020', to: '12-10-2020' }, { from: '25-10-2020', to: '10-11-2020' }, { from: '05-12-2020', to: '18-12-2020' }] }, { name: 'Le Meridien', price: 89.6, city: 'london', availability: [{ from: '01-10-2020', to: '12-10-2020' }, { from: '05-10-2020', to: '10-11-2020' }, { from: '05-12-2020', to: '28-12-2020' }] }, { name: 'Golden Tulip', price: 109.6, city: 'paris', availability: [{ from: '04-10-2020', to: '17-10-2020' }, { from: '16-10-2020', to: '11-11-2020' }, { from: '01-12-2020', to: '09-12-2020' }] }, { name: 'Novotel Hotel', price: 111, city: 'Vienna', availability: [{ from: '20-10-2020', to: '28-10-2020' }, { from: '04-11-2020', to: '20-11-2020' }, { from: '08-12-2020', to: '24-12-2020' }] }, { name: 'Concorde Hotel', price: 79.4, city: 'Manila', availability: [{ from: '10-10-2020', to: '19-10-2020' }, { from: '22-10-2020', to: '22-11-2020' }, { from: '03-12-2020', to: '20-12-2020' }] }] }

    beforeEach(() => {
      nock('https://api.myjson.com/bins/tl0bp')
      .get('')
      .reply(200, response)
    })

    afterEach(() => {})

    it('Should return all hotels', () => {
      return SearchService.search({}).then(response => {
        assert.strictEqual(response.length, 6)
      })
    })

    it('Should return matching hotels by name', () => {
      return SearchService.search({hotel: 'rotana'}).then(response => {
        assert.strictEqual(response[0].name, 'Rotana Hotel')
      })
    })

    it('Should return matching hotels by city', () => {
      return SearchService.search({city: 'paris'}).then(response => {
        assert.strictEqual(response[0].city, 'paris')
      })
    })

    it('Should return matching hotels by price range', () => {
      return SearchService.search({price: '$100:$200'}).then(response => {
        assert.strictEqual(response[0].price > 100 && response[0].price < 200, true)
      })
    })

    it('Should return matching hotels by date range', () => {
      const startDate = '10-10-2020'
      const endDate = '15-10-2020'
      return SearchService.search({date: `${startDate}:${endDate}`}).then(response => {
        const availableStartDate = moment(response[0].availability[0].from, 'DD-MM-YYYY')
        const availableEndDate = moment(response[0].availability[0].to, 'DD-MM-YYYY')

        assert.strictEqual(availableStartDate.isBefore(moment(startDate, 'DD-MM-YYYY')) &&
          availableEndDate.isAfter(moment(endDate, 'DD-MM-YYYY')), true)
      })
    })

    it('Should return all hotels ordered by price', () => {
      return SearchService.search({orderBy: 'price'}).then(response => {
        const firstPrice = response[0].price
        const lowestPrice = response.reduce((min, p) => p.price < min ? p.price : min, response[0].price)

        assert.strictEqual(firstPrice, lowestPrice)
      })
    })

    it('Should return all hotels ordered by name', () => {
      return SearchService.search({orderBy: 'hotel'}).then(response => {
        const firstName = response[0].name
        const lowestName = response.sort((a, b) => {
          if (a.name < b.name) { return -1 }
          if (a.name > b.name) { return 1 }
          return 0
        })[0].name

        assert.strictEqual(firstName, lowestName)
      })
    })

    it('Should return matching hotels by name and city', () => {
      return SearchService.search({hotel: 'rotana', city: 'cairo'}).then(response => {
        assert.strictEqual(response[0].name, 'Rotana Hotel')
        assert.strictEqual(response[0].city, 'cairo')
      })
    })
  })
})

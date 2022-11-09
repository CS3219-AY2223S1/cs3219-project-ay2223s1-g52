const chai = require('chai')
const chaiHttp = require('chai-http')
const httpServer = require('../index')
const Match = require('../model/matchModel')
const {
  STATUS_CODE_SUCCESS,
  STATUS_CODE_BAD_REQUEST,
} = require('../utils/constants')

// Configure chai
chai.use(chaiHttp)
chai.should()

const MATCH_API = '/api/matchService/match'
const ROOM_ID = 'match-hard-someid'
const USER = 'waiting user'

describe('Matches', () => {
  describe('POST', () => {
    let matchId = null
    let pendingMatchId = null

    afterEach(async () => {
      if (matchId) {
        await Match.findByIdAndDelete(matchId)
      }

      await Match.findByIdAndDelete(pendingMatchId)
    })

    beforeEach(async () => {
      const pendingMatch = await Match.create({
        difficulty: 'hard',
        user: USER,
        room: ROOM_ID,
      })
      pendingMatchId = pendingMatch._id
    })

    it('should return isMatch false and create a new match in db', (done) => {
      chai
        .request(httpServer)
        .post(`${MATCH_API}/`)
        .send({ difficulty: 'easy', user: 'name' })
        .end((err, res) => {
          res.should.have.status(STATUS_CODE_SUCCESS)
          res.body.should.be.an('object')
          res.body.should.have.property('isMatch', false)
          res.body.should.have.property('room').that.is.a('string')
          Match.findById(res.body.id, (error, match) => {
            match.should.be.an('object')
            match.should.have.property('id').that.is.a('string')
            matchId = match._id
            done()
          })
        })
    })

    it('should return isMatch true and dont create a new match in db', (done) => {
      chai
        .request(httpServer)
        .post(`${MATCH_API}/`)
        .send({ difficulty: 'hard', user: 'name2' })
        .end((err, res) => {
          res.should.have.status(STATUS_CODE_SUCCESS)
          res.body.should.be.an('object')
          res.body.should.have.property('isMatch', true)
          res.body.should.not.have.property('id')
          res.body.should.have.property('room', ROOM_ID)
          done()
        })
    })

    it('should return error if the user already exists in the db', (done) => {
      chai
        .request(httpServer)
        .post(`${MATCH_API}/`)
        .send({ difficulty: 'medium', user: USER })
        .end((err, res) => {
          res.should.have.status(STATUS_CODE_BAD_REQUEST)
          done()
        })
    })

    it('should return error for invalid fields', (done) => {
      chai
        .request(httpServer)
        .post(`${MATCH_API}/`)
        .send({})
        .end((err, res) => {
          res.should.have.status(STATUS_CODE_BAD_REQUEST)
          done()
        })
    })
  })
})

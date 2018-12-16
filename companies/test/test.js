/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//process.env.NODE_ENV = 'test';"


var companies = require('../src/models/companies')
var connectToMongo = require('../src/config/mongo')

var chai = require('chai')
var chaiHttp = require('chai-http')

var server = require('../src/config/app')

chai.should()
chai.use(chaiHttp)

before(function(done) {
    connectToMongo(process.env.MONGOTESTURL || 'mongodb://localhost:27017/Business-test', done)
})

describe('/POST ', function() {
    it('Create company should respond with status code 200 ', function(done) {

        var company = {
            displayName: 'test',
        }
        chai.request(server)
            .post('/api/v1/createcompany')
            .send(company)
            .end(function(err, res) {
                res.should.have.status(200)
                done()
            })
    })
    it('Create company should not create a duplicate entry ', function(done) {

        var company = {
            displayName: 'test',
        }
        chai.request(server)
            .post('/api/v1/createcompany')
            .send(company)
            .end(function(err, res) {
                res.should.have.status(409)
                done()
            })
    })
    it('Update company should respond with status code 200', function(done) {
        var company = {
            displayName: 'test',
            toUpdateName: 'tmpTest'
        }
        chai.request(server)
            .post('/api/v1/updatecompany')
            .send(company)
            .end(function(err, res) {
                res.should.have.status(200)
                done()
            })
    })
    it('Update company shoulnt be able to update the company twice in a row ', function(done) {
        var company = {
            displayName: 'test',
            toUpdateName: 'tmpTest'
        }
        chai.request(server)
            .post('/api/v1/updatecompany')
            .send(company)
            .end(function(err, res) {
                res.should.have.status(422)
                done()
            })
    })
    it('Create company should be able to add the intial company after updating its displayName ', function(done) {

        var company = {
            displayName: 'test',
        }
        chai.request(server)
            .post('/api/v1/createcompany')
            .send(company)
            .end(function(err, res) {
                res.should.have.status(200)
                done()
            })
        // post hook to delete new entry
        after(function(done) {
            companies.deleteOne({}, function() {
                done()
            })
        })
    })


})
// clearing the test database
after(function(done) {
    companies.deleteOne({}, function() {
        done()
    })
})
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


    it('Create workspace should respond with status code 200 ', function(done) {
        var workSpace = {
            companyName: 'tmpTest',
            workSpaceName: 'test'
        }
        chai.request(server)
            .post('/api/v1/company/createworkspace')
            .send(workSpace)
            .end(function(err, res) {

                res.should.have.status(200)
                done()
            })
    })
    it('Create workspace should not create a duplicate entry ', function(done) {

        var workSpace = {
            companyName: 'tmpTest',
            workSpaceName: 'test'
        }
        chai.request(server)
            .post('/api/v1/company/createworkspace')
            .send(workSpace)
            .end(function(err, res) {
                res.should.have.status(409)
                done()
            })
    })
    it('Update workspace should respond with status code 200', function(done) {
        var updatedWorkSpace = {
            companyName: 'tmpTest',
            workSpaceName: 'test',
            toUpdateName: 'newtmpTest'
        }
        chai.request(server)
            .post('/api/v1/company/updateworkspace')
            .send(updatedWorkSpace)
            .end(function(err, res) {
                res.should.have.status(200)
                done()
            })
    })
    it('Update workspace shoulnt be able to update the workspace twice in a row ', function(done) {
        var updatedWorkSpace = {
            companyName: 'tmpTest',
            workSpaceName: 'test',
            toUpdateName: 'newtmpTest'
        }
        chai.request(server)
            .post('/api/v1/company/updateworkspace')
            .send(updatedWorkSpace)
            .end(function(err, res) {
                res.should.have.status(422)
                done()
            })
    })
    it('Create workspace should be able to add the intial workspace after updating its companyName ', function(done) {

        var workSpace = {
            companyName: 'tmpTest',
            workSpaceName: 'test'
        }
        chai.request(server)
            .post('/api/v1/company/createworkspace')
            .send(workSpace)
            .end(function(err, res) {
                res.should.have.status(200)
                done()
            })
            // post hook to delete new entry
            // after(function(done) {
            //     companies.deleteOne({}, function() {
            //         done()
            //     })
            // })
    })


})
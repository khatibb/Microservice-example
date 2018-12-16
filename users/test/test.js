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


    it('Add user should respond with status code 200 ', function(done) {
        var user = {
            companyName: 'tmpTest',
            workSpaceName: 'test',
            email: 'test@gmail.com',
            role: 'basic',
        }
        chai.request(server)
            .post('/api/v1/company/workspace/addUser')
            .send(user)
            .end(function(err, res) {

                res.should.have.status(200)
                done()
            })
    })
    it('Add user should not create a duplicate entry ', function(done) {
        var user = {
            companyName: 'tmpTest',
            workSpaceName: 'test',
            email: 'test@gmail.com',
            role: 'basic',
        }
        chai.request(server)
            .post('/api/v1/company/workspace/addUser')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(409)
                done()
            })
    })
    it('Remove user should respond with status code 200', function(done) {
        var user = {
            companyName: 'tmpTest',
            workSpaceName: 'test',
            email: 'test@gmail.com'
        }
        chai.request(server)
            .post('/api/v1/company/workspace/removeUser')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200)
                done()
            })
    })

    it('Remove user shouldnt be able to remove an already remove user ', function(done) {

        var user = {
            companyName: 'tmpTest',
            workSpaceName: 'test',
            email: 'test@gmail.com'
        }
        chai.request(server)
            .post('/api/v1/company/workspace/removeUser')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(422)
                done()
            })
            // post hook to clear the Testing DB


    })


})

// delete all added documents for cleanliness
after(function(done) {
    companies.remove({}, done)
})
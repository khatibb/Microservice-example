//process.env.NODE_ENV = 'test';


var companies = require('../models/companies')

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server')
var should = chai.should()


chai.use(chaiHttp)

describe('/POST book', function() {
    it('it should not POST a book without pages field', function(done) {
        var book = {
            title: 'The Lord of the Rings',
            author: 'J.R.R. Tolkien',
            year: 1954
        }
        chai.request(server)
            .post('/book')
            .send(book)
            .end(function(err, res) {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('errors')
                res.body.errors.should.have.property('pages')
                res.body.errors.pages.should.have.property('kind').eql('required')
                done()
            })
    })

})
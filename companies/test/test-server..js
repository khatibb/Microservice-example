/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//process.env.NODE_ENV = 'test';



var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../index')
var should = chai.should()

//to-do add server dynamically.. 
chai.use(chaiHttp)

describe('/POST ', function() {
    it('it should not POST /createcompany without a displayName', function(done) {
        var company = {
            displayName: 'test',
        }
        chai.request('localhost:5000')
            .post('/api/v1/createcompany')
            .send(company)
            .end(function(err, res) {

                if (res.status === 409) {
                    res.should.be.json
                    res.body.should.be.a('object')
                    res.body.should.have.property('success')
                    res.body.should.have.property('message')
                    res.body.success.should.equal(false)
                    res.body.message.should.equal('a company with the same name exists , choose another one !')
                    done()
                } else

                if (res.status === 200) {
                    res.should.have.status(200)
                    res.should.be.json
                    res.body.should.be.a('object')
                    res.body.should.have.property('success')
                    res.body.should.have.property('message')
                    res.body.success.should.equal(true)
                    res.body.message.should.equal('Company created successfully')
                    done()
                } else {
                    done(new Error('failed test'))
                }
            })
    })

    it('it should not POST /update without a displayName or a toUpdateName', function(done) {
        var company = {
            displayName: 'test',
            toUpdateName: 'tempppTest'
        }
        chai.request('localhost:5000')
            .post('/api/v1/updatecompany')
            .send(company)
            .end(function(err, res) {

                if (res.status === 409) {
                    res.should.be.json
                    res.body.should.be.a('object')
                    res.body.should.have.property('success')
                    res.body.should.have.property('message')
                    res.body.success.should.equal(false)
                    res.body.message.should.equal('cant update : a company already exists with that name')
                    done()
                } else

                if (res.status === 200) {
                    res.should.have.status(200)
                    res.should.be.json
                    res.body.should.be.a('object')
                    res.body.should.have.property('success')
                    res.body.should.have.property('message')
                    res.body.success.should.equal(true)
                    res.body.message.should.equal('Company updated successfully')
                    done()
                } else {
                    done(new Error('failed test'))
                }
            })
    })

})
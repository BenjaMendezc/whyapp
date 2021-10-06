const {expect, assert} = require('chai');
const session = require('supertest-session');
const server = require('../src/server.js');



const agent = session(server)



describe('REST endpoint', ()=>{
	describe('GET /', ()=>{
		it('responds with 200', ()=>agent.get(`/whyapp/because?key=1`).expect(200));
		it('recives a key and responds with its value', ()=>
			agent.get('/whyapp/because?key=1')
			.then((res)=>{
				expect(res.body.value).to.be.equal('It is good for your health')
			}));
		it('responds with a different value for each key', ()=>
			agent.get('/whyapp/because?key=2')
			.then((res)=>{
				expect(200)
				expect(res.body.value).to.not.equal('It is good for your health')
			}));
		it('responds with HTTP error if the key does not exist', ()=>
			agent.get('/whyapp/because?key=100')
			.then((res)=>{
				expect(404)
				expect('No reason found, stay home')
			}));
	})
})

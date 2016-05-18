//jshint esversion: 6
const assert = require('chai').assert,
should = require('chai').should,
expect = require('chai').expect,
request = require('supertest'),

api = request('http://localhost:3000');


describe('GET /', function() {
  it('should return a 200 response', function(done) {
    api.get('/')
    .set('Accept', 'text/html')
    .expect(200, done);
  });
});

describe('GET /login', function() {
  it ('should return a 200 response', function(done) {
    api.get('/login')
    .set('Accept', 'text/html')
    .expect(200, done);
  });
});

describe ('GET /play', function() {
  it('should return a 200 response', function(done) {
    api.get('/play')
    .set('Accept', 'text/html')
    .expect(200, done);
  });
});

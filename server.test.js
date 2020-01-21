const request = require('supertest');

const players_mock = require('./players_mock.json');
const player_17_mock = require('./player_17_mock.json');

describe('GET /players', function() {
    it('returns all players', function() {
      return request("localhost:3001")
        .get('/players')
        .set('Accept', 'application/json')
        .expect(200, players_mock.players.sort((actualPlayer, nextPlayer) => actualPlayer.id - nextPlayer.id))
    });
  });

  describe('GET /players/17', function() {
    it('returns player with id 17', function() {
      return request("localhost:3001")
        .get('/players/17')
        .set('Accept', 'application/json')
        .expect(200, player_17_mock)
    });
  });

  describe('GET /players/888', function() {
    it('returns error 404', function() {
      return request("localhost:3001")
        .get('/players/888')
        .set('Accept', 'application/json')
        .expect(404)
    });
  });
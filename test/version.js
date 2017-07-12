/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/**
 * Dependencies
 */
const { expect } = require('chai');
const SemanticReleaseError = require('@semantic-release/error');
const nock = require('nock');
const { ATOM_REGISTRY } = require('../src/const');
const atomVersion = require('../src/version');

/**
 * Tests
 */
const registry = nock(ATOM_REGISTRY);

describe('atomVersion from registry', () => {
  it('get last release', (done) => {
    registry.get('/api/packages/present').reply(200, {
      releases: { latest: '1.0.0' },
    });

    atomVersion({ name: 'present' }, (error, version) => {
      expect(error).to.equal(null);
      expect(version).to.equal('1.0.0');
      done();
    });
  });

  it('not published', (done) => {
    registry.get('/api/packages/missing').reply(404, { message: 'Not Found' });

    atomVersion({ name: 'missing' }, (error, version) => {
      expect(error).to.equal(null);
      expect(version).to.equal(null);
      done();
    });
  });

  it('missing no 404', (done) => {
    registry.get('/api/packages/missing-no-404').reply(200, { message: 'Not Found' });

    atomVersion({ name: 'missing-no-404' }, (error, version) => {
      expect(error).to.exist.and.be.instanceof(SemanticReleaseError);
      expect(error.message).to.equal('Requesting package failed: "Not Found"');
      expect(version).to.equal(undefined);
      done();
    });
  });

  it('missing no body', (done) => {
    registry.get('/api/packages/missing-no-body').reply(200);

    atomVersion({ name: 'missing-no-body' }, (error, version) => {
      expect(error).to.exist.and.be.instanceof(SemanticReleaseError);
      expect(error.message).to.equal('Requesting package failed: {}');
      expect(version).to.equal(undefined);
      done();
    });
  });

  it('error', (done) => {
    registry.get('/api/packages/error').replyWithError('Error');

    atomVersion({ name: 'error' }, (error, version) => {
      expect(error).to.exist.and.be.instanceof(Error);
      expect(version).to.equal(undefined);
      done();
    });
  });
});

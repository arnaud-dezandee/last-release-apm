/**
 * Dependencies
 */

import { expect } from 'chai';
import SemanticReleaseError from '@semantic-release/error';
import lastRelease from '../src/index.js';

/**
 * Tests
 */

describe('last release from registry', () => {
  it('get release from package name', done => {
    lastRelease({}, {
      pkg: { name: 'present' },
    }, (error, release) => {
      expect(error).to.equal(null);
      expect(release).to.deep.equal({
        version: '1.0.0',
        tag: 'latest',
      });
      done();
    });
  });

  describe('get nothing from not yet published package name', () => {
    it('missing', done => {
      lastRelease({}, {
        pkg: { name: 'missing' },
      }, (error, release) => {
        expect(error).to.equal(null);
        expect(release.version).to.equal(undefined);
        done();
      });
    });

    it('missing no 404', done => {
      lastRelease({}, {
        pkg: { name: 'missing-no-404' },
      }, (error, release) => {
        expect(error).to.exist.and.be.instanceof(SemanticReleaseError);
        expect(error.message).to.equal('Requesting package failed: "Not Found"');
        expect(release).to.equal(undefined);
        done();
      });
    });

    it('missing no body', done => {
      lastRelease({}, {
        pkg: { name: 'missing-no-body' },
      }, (error, release) => {
        expect(error).to.exist.and.be.instanceof(SemanticReleaseError);
        expect(error.message).to.equal('Requesting package failed: {}');
        expect(release).to.equal(undefined);
        done();
      });
    });

    it('error', done => {
      lastRelease({}, {
        pkg: { name: 'error' },
      }, (error, release) => {
        expect(error).to.deep.equal({
          message: 'Error',
          statusCode: 500,
          code: 'E500',
        });
        expect(release).to.equal(undefined);
        done();
      });
    });
  });
});

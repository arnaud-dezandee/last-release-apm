/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/**
 * Dependencies
 */

import { expect } from 'chai';
import SemanticReleaseError from '@semantic-release/error';
import nock from 'nock';
import { GITHUB_API } from '../src/const';
import getHead from '../src/head';

/**
 * Tests
 */

const github = nock(GITHUB_API);
const options = {
  githubToken: 'FOO',
};

describe('getHead from github', () => {
  it('get sha from version', (done) => {
    github.get('/repos/test/test/tags').query(true).reply(200, [{
      name: 'v1.1.5',
      commit: { sha: 'f9977551c125796199a739f48907eccf71adaca2' },
    }]);

    getHead(options, { repository: 'https://github.com/test/test.git' }, '1.1.5', (error, sha) => {
      expect(error).to.equal(null);
      expect(sha).to.equal('f9977551c125796199a739f48907eccf71adaca2');
      done();
    });
  });

  it('missing version', (done) => {
    github.get('/repos/test/test/tags').query(true).reply(200, [{
      name: 'hey',
      commit: { sha: 'f9977551c125796199a739f48907eccf71adaca2' },
    }]);

    getHead(options, { repository: 'https://github.com/test/test.git' }, '1.1.5', (error, sha) => {
      expect(error).to.exist.and.be.instanceof(SemanticReleaseError);
      expect(sha).to.equal(undefined);
      done();
    });
  });

  it('missing package', (done) => {
    github.get('/repos/test/missing/tags').query(true).reply(404, { message: 'Not Found' });

    getHead(options, { repository: 'https://github.com/test/missing.git' }, '1.0.0', (error, sha) => {
      expect(error).to.exist.and.be.instanceof(Error);
      expect(sha).to.equal(undefined);
      done();
    });
  });

  it('request error', (done) => {
    github.get('/repos/test/test/tags').query(true).replyWithError('Error');

    getHead(options, { repository: 'https://github.com/test/test.git' }, '1.1.5', (error, sha) => {
      expect(error).to.exist.and.be.instanceof(Error);
      expect(sha).to.equal(undefined);
      done();
    });
  });
});

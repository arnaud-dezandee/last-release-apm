/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/**
 * Dependencies
 */
const { expect } = require('chai');
const nock = require('nock');
const { GITHUB_API, ATOM_REGISTRY } = require('../src/const');
const lastRelease = require('../src/index');

/**
 * Tests
*/

const github = nock(GITHUB_API);
const registry = nock(ATOM_REGISTRY);

describe('lastRelease', () => {
  it('get fast-eslint release', (done) => {
    registry.get('/api/packages/fast-eslint').reply(200, {
      releases: { latest: '1.2.3' },
    });
    github.get('/repos/Adezandee/fast-eslint/tags').query(true).reply(200, [{
      name: 'v1.2.3',
      commit: { sha: 'f9977551c125796199a739f48907eccf71adaca2' },
    }]);

    lastRelease(null, {
      pkg: {
        name: 'fast-eslint',
        repository: 'https://github.com/Adezandee/fast-eslint.git',
      },
      options: {
        githubToken: 'FOO',
      },
    }, (error, release) => {
      expect(error).to.equal(null);
      expect(release).to.deep.equal({
        version: '1.2.3',
        gitHead: 'f9977551c125796199a739f48907eccf71adaca2',
      });
      done();
    });
  });
});

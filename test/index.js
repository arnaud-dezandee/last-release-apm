/**
 * Dependencies
 */

import { expect } from 'chai';
import nock from 'nock';
import lastRelease from '../src/index.js';

/**
 * Tests
*/

const GITHUB_API = 'https://api.github.com';
const github = nock(GITHUB_API);
const ATOM_REGISTRY = 'https://atom.io';
const registry = nock(ATOM_REGISTRY);

describe('lastRelease', () => {
  it('get fast-eslint release', done => {
    registry.get('/api/packages/fast-eslint').reply(200, {
      releases: { latest: '1.2.3' },
    });
    github.get('/repos/Adezandee/fast-eslint/tags').reply(200, [{
      name: 'v1.2.3',
      commit: { sha: 'f9977551c125796199a739f48907eccf71adaca2' },
    }]);

    lastRelease(null, {
      pkg: {
        name: 'fast-eslint',
        repository: 'https://github.com/Adezandee/fast-eslint.git',
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

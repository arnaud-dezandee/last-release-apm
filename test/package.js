/**
 * Dependencies
 */

import { expect } from 'chai';
import getRepository from '../src/package.js';

/**
 * Tests
 */

describe('getRepository from package.json', () => {
  it('empty', () => {
    expect(getRepository()).to.equal(null);
  });

  it('with object', () => {
    expect(getRepository({
      repository: {
        type: 'git',
        url: 'https://github.com/Adezandee/fast-eslint.git',
      },
    })).to.equal('Adezandee/fast-eslint');
  });

  it('with string', () => {
    expect(getRepository({
      repository: 'https://github.com/Adezandee/fast-eslint.git',
    })).to.equal('Adezandee/fast-eslint');
  });

  it('with incomplete', () => {
    expect(getRepository({
      repository: 'https://github.com/fast-eslint.git',
    })).to.equal(null);
  });
});

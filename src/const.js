/**
 * Dependencies
 */

import pkg from '../package.json';

/**
 * Interface
 */

export const ATOM_REGISTRY = 'https://atom.io';

export const GITHUB_API = 'https://api.github.com';

export const headers = {
  'User-Agent': `LastReleaseApm/${pkg.version}`,
};

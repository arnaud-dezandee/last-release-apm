/**
 * Dependencies
 */

const pkg = require('../package.json');

/**
 * Interface
 */

module.exports.ATOM_REGISTRY = 'https://atom.io';

module.exports.GITHUB_API = 'https://api.github.com';

module.exports.headers = {
  'User-Agent': `LastReleaseApm/${pkg.version}`,
};

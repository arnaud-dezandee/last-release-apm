/**
 * Dependencies
 */

const SemanticReleaseError = require('@semantic-release/error');
const request = require('request');
const { ATOM_REGISTRY, headers } = require('./const');

/**
 * Interface
 */

module.exports = function atomVersion(pack, callback) {
  const requestSettings = {
    url: `${ATOM_REGISTRY}/api/packages/${pack.name}`,
    json: true,
    headers,
  };

  request.get(requestSettings, (error, response, body = {}) => {
    if (error) return callback(error);

    if (response.statusCode === 404) {
      return callback(null, null);
    }

    const version = body.releases && body.releases.latest;
    if (response.statusCode === 200 && !!version) {
      return callback(null, version);
    }

    const message = body.message || body.error || body;
    const semError = new SemanticReleaseError(`Requesting package failed: ${JSON.stringify(message)}`);
    return callback(semError);
  });
};

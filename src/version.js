/**
 * Dependencies
 */

import SemanticReleaseError from '@semantic-release/error';
import request from 'request';

/**
 * Privates
 */

const ATOM_REGISTRY = 'https://atom.io';
const headers = {
  'User-Agent': 'LastReleaseApm/' + require('../package.json').version,
};

/**
 * Interface
 */

export default function atomVersion(pack, callback) {
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
    return callback(new SemanticReleaseError(
      `Requesting package failed: ${JSON.stringify(message)}`
    ));
  });
}

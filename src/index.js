/**
 * Dependencies
 */

import SemanticReleaseError from '@semantic-release/error';
import request from 'request';

/**
 * Interface
 */

const ATOM_REGISTRY = 'https://atom.io';

export default function (pluginConfig, { pkg }, callback) {
  const requestSettings = {
    url: `${ATOM_REGISTRY}/api/packages/${pkg.name}`,
    json: true,
  };

  request.get(requestSettings, (error, response, body = {}) => {
    if (error) {
      return callback(error);
    }

    if (response.statusCode === 404) {
      return callback(null, {});
    }

    if (response.statusCode === 200 && body.releases && body.releases.latest) {
      return callback(null, {
        version: body.releases.latest,
        tag: 'latest',
      });
    }

    const message = body.message || body.error || body;
    return callback(new SemanticReleaseError(
      `Requesting package failed: ${JSON.stringify(message)}`
    ));
  });
}

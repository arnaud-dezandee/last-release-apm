/**
 * Dependencies
 */

import SemanticReleaseError from '@semantic-release/error';
import request from 'request';
import getRepository from './package.js';

/**
 * Privates
 */

const GITHUB_API = 'https://api.github.com';
const headers = {
  'User-Agent': 'LastReleaseApm/' + require('../package.json').version,
};

/**
 * Interface
 */

export default function getHead(pack, version, callback) {
  const requestSettings = {
    url: `${GITHUB_API}/repos/${getRepository(pack)}/tags`,
    json: true,
    headers,
  };

  request.get(requestSettings, (error, response, tags = []) => {
    if (error) return callback(error);

    if (response.statusCode === 200) {
      const match = tags.filter(tag => tag.name === `v${version}`);
      if (match.length) {
        return callback(null, match[0].commit.sha);
      }
    }

    return callback(new SemanticReleaseError(
      `GitHub tag missing on remote: v${version}`
    ));
  });
}

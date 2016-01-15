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

/**
 * Interface
 */

export default function getHead(pack, version, callback) {
  const requestSettings = {
    url: `${GITHUB_API}/repos/${getRepository(pack)}/tags`,
    json: true,
  };

  request.get(requestSettings, (error, response, tags = []) => {
    if (error) return callback(error);

    if (response.statusCode === 200) {
      tags.forEach(tag => {
        if (tag.name === `v${version}`) {
          return callback(null, tag.commit.sha);
        }
      });
    }

    return callback(new SemanticReleaseError(
      `GitHub tag missing on remote: v${version}`
    ));
  });
}

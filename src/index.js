/**
 * Dependencies
 */

import debug from 'debug';
import atomVersion from './version.js';
import getHead from './head.js';

/**
 * Dependencies
 */

const log = debug('last-release-apm');

/**
 * Interface
 */

export default function lastRelease(pluginConfig, { pkg, options }, callback) {
  log(options);

  atomVersion(pkg, (err1, version = null) => {
    log({ version, err1 });
    if (err1) return callback(err1);
    if (!version) return callback(null, {});

    return getHead(options, pkg, version, (err2, gitHead = null) => {
      log({ gitHead, err2 });
      if (err2) return callback(err2);

      return callback(null, {
        gitHead,
        version,
      });
    });
  });
}

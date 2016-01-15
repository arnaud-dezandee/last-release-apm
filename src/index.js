/**
 * Dependencies
 */

import atomVersion from './version.js';
import getHead from './head.js';

/**
 * Interface
 */

export default function lastRelease(pluginConfig, { pkg }, callback) {
  atomVersion(pkg, (err1, version = null) => {
    if (err1) return callback(err1);
    if (!version) return callback(null, {});

    getHead(pkg, version, (err2, gitHead = null) => {
      if (err2) return callback(err2);

      return callback(null, {
        gitHead,
        version,
      });
    });
  });
}

/**
 * Dependencies
 */

import url from 'url';

/**
 * Interface
 */

// From https://github.com/atom/apm/blob/master/src%2Fpackages.coffee
export default function getRepository(pack = {}) {
  const repository = pack.repository && pack.repository.url || pack.repository;
  if (!!repository) {
    const repoPath = url.parse(repository.replace(/\.git$/, '')).pathname;
    const [name, owner] = repoPath.split('/').slice(-2);
    if (name && owner) return `${name}/${owner}`;
  }
  return null;
}

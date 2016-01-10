/**
 * Dependencies
 */

import nock from 'nock';

/**
 * Mock
 */

const ATOM_REGISTRY = 'https://atom.io';

const present = {
  name: 'present',
  releases: {
    latest: '1.0.0',
  },
};

const missing = {
  message: 'Not Found',
};

export const registry = nock(ATOM_REGISTRY)
  .get('/api/packages/present')
  .reply(200, present)
  .get('/api/packages/missing')
  .reply(404, missing)
  .get('/api/packages/missing-no-404')
  .reply(200, missing)
  .get('/api/packages/missing-no-body')
  .reply(200)
  .get('/api/packages/error')
  .replyWithError({
    message: 'Error',
    statusCode: 500,
    code: 'E500',
  });

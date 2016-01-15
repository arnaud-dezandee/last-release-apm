# How to setup semantic release for your Atom package
> How to use semantic-release to publish new versions of your APM modules.

As an introduction to automated release flow I recommend you to watch this series of videos:
[“How to Write a JavaScript Library - Automating Releases with semantic-release” – egghead.io](https://egghead.io/lessons/javascript-how-to-write-a-javascript-library-automating-releases-with-semantic-release).

Well, now [semantic-release](https://github.com/semantic-release/semantic-release) package is built around the standard NPM flow,
so we have to work a bit to make it work with APM.

Here is a step-by-step guide how to do this (with CircleCI thanks to [condition-circle made by bahmutov](https://github.com/bahmutov/condition-circle))

## Semantic-release setup

For initial CI setup, please take a look at [TravisCI](https://egghead.io/lessons/javascript-how-to-write-a-javascript-library-automatically-releasing-with-travisci) / [CircleCI](https://github.com/bahmutov/condition-circle/HOW.md)

## NPM Scripts

The default NPM script installed for semantic-release is:

```json
"scripts": {
  "semantic-release": "semantic-release pre && npm publish && semantic-release post"
},
```

Now we should replace it with `apm publish`. Well, that's not that easy because those two commands behave quite differently.

This is what `apm publish` really do:
  * `npm version -m "Prepare x.x.x release"`
    - Create a new commit inside git named "Prepare x.x.x release"
    - Create a new tag `vx.x.x`
  * `git push && git push --tags`
    - Push the commit and tag to remote repository
  * `apm publish --tag vx.x.x`
    - This call the Atom.io API and tells it to create a new release based on the provided tag.
    In the background, Atom registry will download a tar ball of your project from git based on this tag.
    It will then try to read the package.json to determine the real version you wish to release.

**And here is the catch**, semantically released package doesn't have a "git saved" `package.version`.

So here is the NPM scripts I'm using to make it work:

```json
"scripts": {
  "pregit:push": "git commit -am \"Prepare $npm_package_version release\"",
  "git:push": "git push",
  "apm:publish": "apm publish -t v$npm_package_version",
  "semantic-release": "semantic-release pre && npm run git:push && semantic-release post && npm run apm:publish"
},
```

You can see it work on my Atom package: [fast-eslint](https://github.com/Adezandee/fast-eslint).

## last-release-apm

In order to `semantic-release` command to fetch the correct last release from Atom registry (instead of NPM registry),
we'll use [last-release-apm](https://github.com/Adezandee/last-release-apm) module:

```bash
$ npm install --save-dev last-release-apm
```

Add the following to the `package.json`

```json
"release": {
  "getLastRelease": "last-release-apm"
}
```

## CircleCI setup

As you can see inside the NPM scripts, we are going to create a new release commit during the CI builds.
This means that CircleCI (or TravisCI) should have the right to push to your git repository.
This can be done by adding a `user key` to your project settings: [see here](https://circleci.com/docs/github-security-ssh-keys).

## Finally

Don't forget to add the [semantic-release badge](https://github.com/semantic-release/semantic-release#badge)
to your README!

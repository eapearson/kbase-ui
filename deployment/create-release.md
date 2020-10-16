---
---
# Create Release

Once the codebase has been verified, release notes have been prepared, and the integration tests run with success, it is time to perform the final merge from develop to master, and create the release.

At this point, the upstream kbase `develop` branch should be up to date with all code changes, including the release notes and any last minute changes required to address code quality or test failure.

The final release takes just a few minutes:

- merge develop branch to master
- create a release with a semver tag

After the release is created, the Travis integration will trigger a build, which will result in an image created with the `latest` tag and subsequently being pushed to dockerhub.

After that, the image may be be deployed.

## Merge develop to master

## Create a release
---
---
# Integration Tests

Although Integration Tests may be run at any time, and should be run periodically during development, especially if potentially disruptive changes are being made, they do have a special place in the release process.

Other than the usual benefits they bring (see [testing](../testing)), since Integration Tests are run against an actual KBase deployment environment, they impart confidence that kbase-ui will actually operate correctly when deployed.

The tests should be run after all code changes have been made and committed upstream. Since a test failure may require code modifications, you should be ready to engage in a test / modify /test cycle until the tests pass cleanly.

Also be aware of false negative conditions. Integration tests do put stress on the full stack required to load and run one set of features in the ui. Not that this is unusual, as it merely mimicks a real user using kbase-ui, but the serial repetition of such processes can sometimes lead to test timeout failures:

- heavy pages with many service calls, like the dashboard, can experience service call latency which can cause page load time to exceed the default timeout of 10 seconds.

- If your host machine is busy with other things, load and render times can be slow and lead to test timeouts. Just to support testing, one must have docker running, with the kbase-ui and ui proxy running, along with the tests running under yarn and node. Just this is enough to stress some hosts, like MacOS or Windows, in which the linux environment must share resources (cpu, memory, disk) with the host.

## Running the Tests

### Prepare

- wipe tests directory
- fresh build
- obtain token for CI
- obtain token for Prod

### Test against CI

### Test against Prod

### Subsetting tests

### Disabling tests
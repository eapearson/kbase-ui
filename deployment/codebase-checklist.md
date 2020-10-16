---
---
# Codebase Checklist

Prior to preparing a release, the codebase should be put into a good state. This is really a "good housekeeping" practice, and generally does not affect software functionality.

Some of these tasks are or should be validated by automated tools, which can be run ad-hoc or as an assertion script during the prod build process. When run a prod build is run, additional, time-consuming processes are run, including JS minification, tests, and the housekeeping tasks described in this document. The housekeeping script is an "assertion script", which returns 0 if it deems the codebase worthy, and 1 if it does not.

## Summary

- all code changes should be covered by unit tests, if feasible
- all bug fixes should be accompanied by unit or integration tests which would fail if the bug were present
- console.logs should be removed
- commented code should be removed
- code should meet coding standards

## TODO

- pass linting
- 

- we really needs some automated tools for:
  - finding things we don't want:
    - console.log
    - commented out code
  - coding style
  - coding practice

- we need a way to track precisely what is in the release, and ensure that those items are addressed
  - maybe we need a special release file which lists changes:
    - JIRA tix addressed
    - github issues addressed
    - Non-JIRA defects or changes?
  - this will also help notify folks for:
    - pre-release signoff
    - post-release notification
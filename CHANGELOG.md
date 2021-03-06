# Changelog

## [2.0.0] - 2020-06-22

### Added

- Support for authorization by transaction
- Support for authorization by tree
- Support for device profile collection callback
- Allow server paths to be configurable
- Allow OAuth token storage to be configurable
- Support for request "middleware" for modifying request from SDK
- "Containerize" code base for easier development
- End-to-end tests now use Playwright and mock Node.js server
- Support for WebAuthn script-based authentication

### Fixed

- Increased default timeout to accommodate development/debugging
- Provide alternative token store for Firefox Private IndexedDB bug
- Aligned json-based WebAuthn with 7.0 release of AM

## [1.0.5] - 2020-01-16

### Added

- Support for additional querystring parameters (e.g. `suspendedId`) when invoking authentication trees

## [1.0.4] - 2020-01-06

### Fixed

- Renamed `getWebAuthStepType` to `getWebAuthnStepType` in `FRWebAuthn` module

## [1.0.3] - 2020-01-06

### Added

- Replaced `url` and `querystring` dependencies to avoid build issues in some environments

## [1.0.2] - 2019-12-20

### Added

- Exported `Deferred` and `nonce`

## [1.0.1] - 2019-12-19

### Added

- Server mocking with Mirage JS for E2E tests
- Version header to all OpenAM calls to avoid CSRF problems
- Updated callback interface to reflect that some properties are optional

## [1.0.0] - 2019-12-09

### Added

- WebAuthn module that can be used in custom UIs
- Improvements to `FRCallback`
- Addressed all linter warnings

## [0.9.3] - 2019-11-13

### Fixed

- Non-relative import in FRAuth module

## [0.9.2] - 2019-11-06

### Added

- OAuth2Client obeys `realmPath` configuration setting

## [0.9.1] - 2019-10-28

### Added

- FRPolicy module allows easy consumption and customization of policy-related errors
- Export `SessionManager` module
- `FRStep.type` property to simplify conditional handling of tree responses
- Overhaul and expansion of tests to include unit, integration, and e2e testing

## [0.9.0] - 2019-10-17

### Added

- Initial release for SDK
- Initial npm deployment for beta version

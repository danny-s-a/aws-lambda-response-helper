# APPLICATION NAME

All notable changes to this project will be documented in this file.

## Rules
- Entries should follow guidance from [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- Each entry should be titled with version and date
- Use semantic versioning
- Use the YYYY-MM-DD date format
- Most recent entry should be at the top


## Releases

### 1.1.1
### Changed
- Ability to configure the tokenUserKey i.e. property within the decoded JWT that specifies the username, defaults to `email` but can be set using via env var `process.env.ALR_TOKEN_USER_KEY`

### 1.1.0
#### Changed
- Console log now stringifies object

### 1.0.5
#### Added
- Conflict & NotFound responses
#### Changed
- errorHandler to accept type `any`

### 1.0.4
#### Changed
- Changed all default exports to be explicit

### 1.0.3
#### Changed
- Set types file
- Added sonar properties file to npm ignore

### 1.0.2
#### Added
- Configured SonarCloud scanning
#### Fixed
- Version check workflow job, uses npm registry rather than github

### 1.0.1
#### Added
- Configured SonarCloud scanning
#### Changed
- From ISC to MIT Licence & Added licence file

### 1.0.0
#### Added
- Scaffolded project inc. README, CHANGELOG, Actions Workflows
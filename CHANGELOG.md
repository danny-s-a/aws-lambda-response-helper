# CHANGELOG

All notable changes to this project will be documented in this file.

## Rules
- Entries should follow guidance from [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- Each entry should be titled with version and date
- Use semantic versioning
- Use the YYYY-MM-DD date format
- Most recent entry should be at the top


## Releases

### 1.1.8
#### Fixed
- json5 vulnerability

### 1.1.7
#### Changed
- errorHandler() now logs any error received using console.error

### 1.1.5
#### Fixed
- Missing optional `hideBody` param for `errorHandler()`

### 1.1.4
#### Added
- Option to not log request body so sensitive content can be hidden

### 1.1.3
#### Changed
- @types/aws-lambda now a full dependency to prevent build issues for dependent packages that don't have it installed

### 1.1.2
#### Added
- Ability to change header key in which the auth token resides via the `process.env.ALR_TOKEN_HEADER_KEY` env var, default is `Authorization`
#### Changed
- Ability to configure the tokenUserKey i.e. property within the decoded JWT that specifies the username, defaults to `email` but can be set using via env var `process.env.ALR_TOKEN_USER_KEY`
- Updated examples in readme to reflect/demonstrates changes

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
## Requirements

- NodeJS LTS (14+) <https://nodejs.org/en/download/package-manager>
- Yarn 1 <https://classic.yarnpkg.com/en/docs/install>

## Usage

- Install NodeJS and Yarn
- `git clone`
- `yarn`
- `node healthcheck.js -h 127.0.0.1 -p 9933`

## Return sample

```
node healthcheck.js -h 127.0.0.1 -p 9933
2021-09-16 17:05:30        API/INIT: Api will be available in a limited mode since the provider does not support subscriptions
2021-09-16 17:05:31        METADATA: Unknown types found, no types for SpecVersion
{"onChainTimestamp":1631810976042,"localTimestamp":1631810994331,"gapInMinutes":0.3048166666666667,"headBlockNumber":11755}
```

## How to monitor

You should take care of `gapInMinutes` (`(localTimestamp - onChainTimestamp) / 1000 / 60`), it should `< 2`

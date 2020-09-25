# exchange-rate-app

[![Netlify Status](https://api.netlify.com/api/v1/badges/9a938643-a3c7-4ca1-aac6-fe2f420db2e6/deploy-status)](https://app.netlify.com/sites/optimistic-blackwell-902e64/deploys)

https://optimistic-blackwell-902e64.netlify.app/

This app is build using `react, typescript, webpack/babel, redux, redux-saga, styled-components, chart.js, axios, eslint, prettier, jest, React Testing Library`

**_API used_**: `https://api.exchangeratesapi.io`

### Commands

```
* yarn start // To run it locally
* yarn test  To run all tests
* yarn build // To build the app
* yarn lint // For lint fixes
* yarn test:watch // To run latest tests after commit
```

### Local setup

```
yarn
yarn start
```

**_App will be active and running on http://localhost:8080/_**

### GIF

![][https://github.com/punitgr/exchange-rate-app/blob/master/gif/new.gif =600x600 ]

### Code structure

- `components/Exchange` - For the exchange screen
- `components/common` - Contains all the common components
- `components/Icons` - Consist of all the icons (Used SVG components)
- `components/Widget` - Conist of the Widget and HistoryChart component.
  Right now, widget hits the api to fetch exhchange rate for a pair of currency every 10 seconds. It can also be a subscription if provided the api.
- `@types` - Consiting of types which is used accross the code like `State, Options, ...etc`
- `store/` - Conist of files related to redux which is the state container of the app.
  Used `redux-saga` for handling side effects.
- `utils` - Common utility functions and keeping color config.

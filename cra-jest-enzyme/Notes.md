#Setup

1. npx create-react-app cra-jest-enzyme
2. npm i -D ts-jest jest-fetch-mock enzyme enzyme-adapter-react-16 enzyme-to-json @types/enzyme @types/enzyme-adapter-react-16 --save-exact
3. Add to package.json

```json

  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts",
      "!src/index.tsx",
      "!src/serviceWorker.ts",
      "!src/reportWebVitals.ts"
    ],
    "coveragePathIgnorePatterns": [
      "./src/*/*.types.{ts,tsx}",
      "./src/index.tsx",
      "./src/serviceWorker.ts"
    ],
    "coverageReporters": [
      "json",
      "lcov",
      "text-summary",
      "clover"
    ],
    "coverageThreshold": {
      "global": {
        "statements": 95,
        "branches": 95,
        "lines": 95,
        "functions": 95
      }
    },
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ],
    "transform": {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/ts-jest"
    },
    "transformIgnorePatterns": [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
      "^.+\\.module\\.(css|sass|scss)$"
    ],
    "moduleNameMapper": {
      "^react-native$": "react-native-web",
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
      "src/(.*)$": "<rootDir>/src/$1"
    }
  }
```

4. Add to setupTests.js
```javascript
/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';Enzyme.configure({ adapter: new ReactSixteenAdapter() });
```
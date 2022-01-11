{
  "name": "@wazirx/node-client",
  "version": "1.0.0",
  "description": "node sdk for wazirx",
  "main": "lib/cjs/index.js",
  "types": "lib/types/index.d.ts",
  "module": "lib/esm/index.js",
  "scripts": {
    "tsc": "tsc",
    "build": "npm run build:cjs && npm run build:esm && npm run build:types",
    "build:cjs": "node tools/cleanup cjs && tsc -p config/tsconfig.cjs.json",
    "build:esm": "node tools/cleanup esm && tsc -p config/tsconfig.esm.json",
    "build:types": "node tools/cleanup types && tsc -p config/tsconfig.types.json",
    "prepare": "npm run build",
    "test": "mocha test/test.js -r dotenv/config --timeout 10000"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/arunnattarayan/wazirx-connector-node.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/arunnattarayan/wazirx-connector-node/issues"
  },
  "homepage": "https://github.com/arunnattarayan/wazirx-connector-node#readme",
  "devDependencies": {
    "chai": "^4.3.4",
    "dotenv": "^10.0.0",
    "mocha": "^9.1.3",
    "typescript": "^4.5.4"
  },
  "dependencies": {
    "@types/crypto-js": "^4.1.0",
    "axios": "^0.24.0",
    "crypto-js": "^4.1.1"
  }
}

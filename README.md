# Imitation

Mock out non-code imports in Typescript Jest tests

## Usage with Jest

Set a Jest transform in your `package.json` file:

```json
{
  "jest": {
    "transform": {
      "\\.(css|scss|jpg|png|svg|eot|woff)$": "<rootDir>/node_modules/imitation"
    }
  }
}
```

Stylesheet files (CSS/SCSS/Less) will resolve to proxies that return any classname as itself (eg. `styles.base` resolves to 'base').

Anything else will resolve to require string (eg. 'something.png' will resolve to just 'something.png');

## Authors

- Nathan Hoad - [nathan@nathanhoad.net](mailto:nathan@nathanhoad.net)

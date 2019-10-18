# Imitation

A simple Jest transform for non-code imports

## Usage with Jest

`npm i --save-dev imitation`

Then set a Jest transform in your `package.json` file:

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

Anything else (ie. images or fonts or whatever) will resolve to require string (eg. 'something.png' will resolve to just 'something.png');

## Authors

- Nathan Hoad - [nathan@nathanhoad.net](mailto:nathan@nathanhoad.net)

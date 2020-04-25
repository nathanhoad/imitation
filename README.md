# Imitation

A simple Jest moduleNameMapper for non-code imports. It helps for testing stuff like CSS Modules and images.

## Usage with Jest

`npm i --save-dev imitation`

Then set it up in your `jest.config.js` file:

```json
{
  "jest": {
    // ... other config
    "moduleNameMapper": {
      "\\.(svg|png|jpg)$": "imitation/images",
      "\\.(scss|css)$": "imitation/styles"
    }
  }
}
```

Stylesheet files (CSS/SCSS/Less) will resolve to proxies that return any classname as itself (eg. `styles.base` resolves to 'base').

Anything else (ie. images or fonts or whatever) will resolve to the string "imitated".

## Authors

- Nathan Hoad - [nathan@nathanhoad.net](mailto:nathan@nathanhoad.net)

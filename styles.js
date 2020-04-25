module.exports = new Proxy(
  {},
  {
    get: function (styles, className) {
      if (className === "__esModule") return false;

      return className;
    }
  }
);

const styleMapper = require("./styles");

describe("StyleMapper", () => {
  it("doesn't import as default", () => {
    expect(styleMapper.__esModule).toBe(false);
  });

  it("responds with any class name", () => {
    expect(styleMapper.someClass).toBe("someClass");
  });
});

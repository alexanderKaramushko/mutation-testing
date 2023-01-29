import isEven from "./isEven";

describe('Test isEven', () => {
  it('should return true for even number', () => {
    const actual = isEven(2);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('should return false for odd number', () => {
    const actual = isEven(1);
    const expected = false;

    expect(actual).toEqual(expected);
  });

  it('should throw error if number is float', () => {
    const actual = isEven(1.5);
    const expected = new Error();

    expect(actual).toEqual(expected);
  });
});

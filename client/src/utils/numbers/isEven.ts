export default (number: number) => {
  if (Math.round(number) !== number) {
    return new Error();
  }

  return number % 2 === 0;
}

import useToggle from "./useToggle";
import { renderHook } from '@testing-library/react-hooks';

describe('Test useToggle', () => {
  it('should be initially false', () => {
    const { result } = renderHook(useToggle);

    const actual = result.current.toggled;
    const expected = false;

    expect(actual).toEqual(expected);
  });

  it('should toggle to true', () => {
    const { result, waitFor } = renderHook(useToggle);

    result.current.toggle();

    waitFor(() => result.current.toggled);

    const actual = result.current.toggled;
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('should toggle to false', () => {
    const { result, waitFor } = renderHook(useToggle, {
      initialProps: true
    });

    result.current.toggle();

    waitFor(() => result.current.toggled);

    const actual = result.current.toggled;
    const expected = false;

    expect(actual).toEqual(expected);
  });
});

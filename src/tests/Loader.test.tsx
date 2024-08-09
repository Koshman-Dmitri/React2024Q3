import { render } from '@testing-library/react';
import { Loader } from '../components';

describe('Loader', () => {
  test('Should be rendered', () => {
    const { container } = render(<Loader />);
    expect(container).toBeDefined();
  });
});

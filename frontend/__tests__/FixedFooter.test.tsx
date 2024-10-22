import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import FixedFooter from '../components/layout/FixedFooter';

describe('FixedFooter', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <FixedFooter>
        <Text>Footer Content</Text>
      </FixedFooter>
    );

    expect(getByText('Footer Content')).toBeTruthy();
  });

  it('applies custom styles when style prop is provided', () => {
    const customStyle = { backgroundColor: 'blue' };
    const { getByTestId } = render(
      <FixedFooter style={customStyle}>
        <Text>Styled Footer Content</Text>
      </FixedFooter>
    );

    const footer = getByTestId('footer-container');

    expect(footer.props.style).toContainEqual({ position: 'absolute', bottom: 10, left: 20, right: 20 });
    expect(footer.props.style).toContainEqual(customStyle);
  });

  it('memoizes the style correctly', () => {
    const style = { backgroundColor: 'blue' };

    const { rerender, getByTestId } = render(
      <FixedFooter style={style}>
        <Text>Footer Content</Text>
      </FixedFooter>
    );

    const footerFirstRender = getByTestId('footer-container');

    rerender(
      <FixedFooter style={style}>
        <Text>Footer Content</Text>
      </FixedFooter>
    );

    const footerSecondRender = getByTestId('footer-container');
    expect(footerFirstRender).toBe(footerSecondRender);
  });
});
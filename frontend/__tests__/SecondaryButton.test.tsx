import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SecondaryButton from '../components/buttons/SecondaryButton';

describe('SecondaryButton', () => {
  it('renders the correct button text', () => {
    const { getByText } = render(
      <SecondaryButton onPress={() => {}} buttonText="Cancel" />
    );

    expect(getByText('Cancel')).toBeTruthy();
  });

  it('calls onPress when button is pressed', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <SecondaryButton onPress={onPressMock} buttonText="Cancel" />
    );

    const button = getByText('Cancel');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
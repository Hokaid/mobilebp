import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PrimaryButton from '../components/buttons/PrimaryButton';

describe('PrimaryButton', () => {
  it('renders the correct button text', () => {
    const { getByText } = render(
      <PrimaryButton onPress={() => {}} buttonText="Submit" />
    );

    expect(getByText('Submit')).toBeTruthy();
  });

  it('handles button press correctly', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <PrimaryButton onPress={onPressMock} buttonText="Submit" />
    );

    const button = getByText('Submit');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
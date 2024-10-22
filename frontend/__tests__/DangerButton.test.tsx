import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DangerButton from '../components/buttons/DangerButton';

describe('DangerButton', () => {
  it('renders the correct button text', () => {
    const { getByText } = render(
      <DangerButton onPress={() => {}} buttonText="Delete" />
    );

    expect(getByText('Delete')).toBeTruthy();
  });

  it('handles button press correctly', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <DangerButton onPress={onPressMock} buttonText="Delete" />
    );

    const button = getByText('Delete');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
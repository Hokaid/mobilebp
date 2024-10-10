import React from 'react';
import { render } from '@testing-library/react-native';
import DatePicker from '../components/DatePicker';

describe('DatePicker', () => {
  it('renders correctly', () => {
    const onChangeDate = jest.fn();
    const { getByText } = render(
      <DatePicker
        label="Test Date"
        value=""
        onChangeDate={onChangeDate}
      />
    );
    expect(getByText('Test Date')).toBeTruthy();
  });

  it('displays error message when provided', () => {
    const onChangeDate = jest.fn();
    const { getByText } = render(
      <DatePicker
        label="Test Date"
        value=""
        onChangeDate={onChangeDate}
        error="This is an error"
      />
    );
    expect(getByText('This is an error')).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import DatePicker from '../components/form/DatePicker';

describe('DatePicker', () => {
  it('renders the correct label and initial value', () => {
    const { getByText } = render(
      <DatePicker label="Fecha de nacimiento" value="" onChangeDate={() => {}} />
    );

    expect(getByText('Fecha de nacimiento')).toBeTruthy();
    expect(getByText('Seleccione una fecha')).toBeTruthy();
  });

  it('renders the error message if provided', () => {
    const { getByText } = render(
      <DatePicker label="Fecha de nacimiento" value="" onChangeDate={() => {}} error="An error occurred" />
    );

    expect(getByText('An error occurred')).toBeTruthy();
  });
});
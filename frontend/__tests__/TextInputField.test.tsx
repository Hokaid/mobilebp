import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextInputField from '../components/form/TextInputField';

describe('TextInputField', () => {
  it('renders the correct label and initial value', () => {
    const { getByText, getByDisplayValue } = render(
      <TextInputField label="First Name" value="John" onChange={() => {}} />
    );

    expect(getByText('First Name')).toBeTruthy();
    expect(getByDisplayValue('John')).toBeTruthy();
  });

  it('calls onChange function when typing in the input', () => {
    const handleChange = jest.fn();

    const { getByDisplayValue } = render(
      <TextInputField label="First Name" value="John" onChange={handleChange} />
    );

    const input = getByDisplayValue('John');
    fireEvent.changeText(input, 'Jane');
    expect(handleChange).toHaveBeenCalledWith('Jane');
  });

  it('renders an error message if provided', () => {
    const { getByText } = render(
      <TextInputField label="First Name" value="John" onChange={() => {}} error="This field is required" />
    );

    expect(getByText('This field is required')).toBeTruthy();
  });

  it('does not allow typing if editable is set to false', () => {
    const handleChange = jest.fn();

    const { getByDisplayValue } = render(
      <TextInputField label="First Name" value="John" onChange={handleChange} editable={false} />
    );

    const input = getByDisplayValue('John');
    fireEvent.changeText(input, 'Jane');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('supports multiline input', () => {
    const handleChange = jest.fn();

    const { getByDisplayValue } = render(
      <TextInputField label="Description" value="Hello" onChange={handleChange} multiline={true} />
    );

    const input = getByDisplayValue('Hello');
    fireEvent.changeText(input, 'Hello world');
    expect(handleChange).toHaveBeenCalledWith('Hello world');
  });
});
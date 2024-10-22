import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

interface TextInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  error?: string;
  editable?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({ label, value, onChange, multiline = false, error, editable = true }) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : {}]}
        value={value}
        onChangeText={onChange}
        multiline={multiline}
        editable={editable}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default TextInputField;